"use server";

import { db } from "@/db/client";
import { revalidatePath } from "next/cache";

import { categorySchema, type CategorySchema } from "@/schemas/category";

export const updateCategory = async (categoryId: number, values: CategorySchema) => {
  try {
    const validatedFields = categorySchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    console.log(values);

    const category = await db.category.update({
      where: { id: categoryId },
      data: { ...values },
    });

    revalidatePath(`/products/categories/${category.id}`);

    return { success: `${category.name} updated.` };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong." };
  }
};