"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { createProductSchema, type CreateProductSchema } from "@/schemas/product";

export const createProduct = async (values: CreateProductSchema) => {
  try {
    const validatedFields = createProductSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const { productItems, ...productValues } = values;

    const product = await db.product.create({
      data: {
        ...productValues,
        productItems: {
          create: productItems.map(({ name, sku, price, stock, imageUrls }) => ({
            name,
            sku,
            price,
            stock,
            images: {
              create: imageUrls.map(imageUrl => ({
                imageUrl,
              })),
            },
          })),
        },
      },
    });

    revalidatePath("/products");

    return {
      data: { productId: product.id },
      success: `${product.name} created.`,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong." };
  }
};