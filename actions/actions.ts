"use server";

import prisma from "@/lib/db";
import { Pet } from "@/lib/types";
import { sleep } from "@/lib/utils";

import { revalidatePath } from "next/cache";

const defaultPetImage =
  "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";

export async function addPet(newPet: Omit<Pet, "id">) {
  await sleep(2000);

  try {
    await prisma.pet.create({
      data: newPet,
    });
  } catch (error) {
    return { message: "Couldn't add the pet" };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: string, newPet: Omit<Pet, "id">) {
  await sleep(2000);

  try {
    await prisma.pet.update({
      where: { id: petId },
      data: newPet,
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
