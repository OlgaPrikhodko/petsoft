"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const defaultPetImage =
  "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";

export async function addPet(formData) {
  await sleep(2000);

  try {
    await prisma.pet.create({
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        imageUrl: formData.get("imageUrl") || defaultPetImage,
        age: parseInt(formData.get("age")),
        notes: formData.get("notes"),
      },
    });
  } catch (error) {
    return { message: "Couldn't add pet" };
  }

  revalidatePath("/app", "layout");
}
