"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";

import { ResetPasswordSchema } from "@/schemas";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";

import { getUserByEmail } from "@/data/user";

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
  token?: string | null,
) => {
  if (!token) return { error: "Missing token." };

  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields." };

  const { password } = validatedFields.data;

  const passwordResetToken = await getPasswordResetTokenByToken(token);

  if (!passwordResetToken) return { error: "Token does not exist." };

  if (new Date() > new Date(passwordResetToken.expires)) return { error: "Token has expired." };

  const user = await getUserByEmail(passwordResetToken.email);

  if (!user) return { error: "User does not exist." };

  const hashedPassword = await bcrypt.hash(password, 10);

  await Promise.all([
    db.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    }),
    db.passwordResetToken.delete({
      where: { id: passwordResetToken.id },
    }),
  ]);

  return { success: "Password updated!" };
};