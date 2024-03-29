"use server";

import * as z from "zod";

import { resetSchema } from "@/schemas/auth";

import { getUserByEmail } from "@/db/query/user";

import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof resetSchema>) => {
  try {
    const validatedFields = resetSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid email." };

    const { email } = validatedFields.data;

    const user = await getUserByEmail(email);

    if (!user) return { error: "Email not found." };

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail({
      email: passwordResetToken.email,
      token: passwordResetToken.token,
    });

    return { success: `Reset password email sent to ${email}.` };
  } catch {
    return { error: "Something went wrong." };
  }
};