import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";

export const petFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Name is required" })
      .max(20, { message: "Too long name" }),
    ownerName: z
      .string({ required_error: "ownerName is required" })
      .trim()
      .min(1, { message: "ownerName is required" })
      .max(20, { message: "Too long ownerName" }),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Image url must be a valid url" }),
    ]),
    age: z.coerce
      .number({
        required_error: "Age is required",
        invalid_type_error: "Age must be a number",
      })
      .positive({ message: "Age must be a positive number" })
      .max(100),
    notes: z.union([
      z.literal(""),
      z.string().trim().max(1000, { message: "Too long notes" }),
    ]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));
// trasform doesn't work for server actions, but does work for traditional handler onSubmit

export type TPetForm = z.infer<typeof petFormSchema>;
