"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { billboardSchema, type BillboardSchema } from "@/schemas/billboard";

import { getStoreById } from "@/db/query/store";

export const createBillboard = async (storeId: string, values: BillboardSchema) => {
  try {
    const validatedFields = billboardSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const store = await getStoreById(storeId);

    if (!store) return { error: "Store not found." };

    const billboard = await db.billboard.create({
      data: {
        storeId,
        ...values,
      },
    });

    revalidatePath(`/dashboard/${storeId}/billboards`);

    return { success: `${billboard.label} created.` };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};