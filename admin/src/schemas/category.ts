import * as z from "zod";

export const categorySchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().or(z.null()),
});
export type CategorySchema = z.infer<typeof categorySchema>;