"use server";

import prisma from "@/lib/db";
import { PetEssentials } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addPet(newPet: PetEssentials) {
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

export async function editPet(petId: Pet["id"], newPet: PetEssentials) {
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

export async function deletePet(petId: Pet["id"]) {
  await sleep(2000);

  try {
    await prisma.pet.delete({ where: { id: petId } });
  } catch (error) {
    return { message: "Couldn't delete the pet" };
  }

  revalidatePath("/app", "layout");
}
