"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const defaultPetImage =
  "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";

export async function addPet(formData: FormData) {
  await sleep(2000);

  try {
    await prisma.pet.create({
      data: {
        name: formData.get("name") as string,
        ownerName: formData.get("ownerName") as string,
        imageUrl: (formData.get("imageUrl") as string) || defaultPetImage,
        age: parseInt(formData.get("age") as string),
        notes: formData.get("notes") as string,
      },
    });
  } catch (error) {
    return { message: "Couldn't add the pet" };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: string, formData: FormData) {
  await sleep(2000);

  try {
    await prisma.pet.update({
      where: { id: petId },
      data: {
        name: formData.get("name") as string,
        ownerName: formData.get("ownerName") as string,
        imageUrl: (formData.get("imageUrl") as string) || defaultPetImage,
        age: parseInt(formData.get("age") as string),
        notes: formData.get("notes") as string,
      },
    });
  } catch (error) {
    return { message: "Couldn't edit the pet" };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(petId: string) {
  await sleep(2000);

  try {
    await prisma.pet.delete({ where: { id: petId } });
  } catch (error) {
    return { message: "Couldn't delete the pet" };
  }

  revalidatePath("/app", "layout");
}
