"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

// --------- User actions ---------------------

export async function signUp(formData: FormData) {
  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10,
  );

  const user = await prisma.user.create({
    data: {
      email: formData.get("email") as string,
      hashedPassword,
    },
  });

  await signIn("credentials", formData);
}

export async function logIn(formData: FormData) {
  await signIn("credentials", formData);
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

// --------- Pet actions ---------------------

export async function addPet(newPet: unknown) {
  await sleep(2000);

  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const validatePet = petFormSchema.safeParse(newPet);
  if (!validatePet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatePet.data,
        user: {
          connect: { id: session.user.id },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return { message: "Couldn't add the pet" };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, newPet: unknown) {
  await sleep(2000);

  // authentication check
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // validation
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatePet = petFormSchema.safeParse(newPet);

  if (!validatedPetId.success || !validatePet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  // authorization check
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  });

  if (!pet) {
    return { message: "Pet not found" };
  }

  if (pet.userId !== session.user.id) {
    return { message: "Not authorized." };
  }

  // database mutation
  try {
    await prisma.pet.update({
      where: { id: validatedPetId.data },
      data: validatePet.data,
    });
  } catch (error) {
    return { message: "Couldn't edit the pet" };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
  await sleep(2000);

  // authentication check
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // validation
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid pet id",
    };
  }

  // authorization check (user belongs to pet)
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
    select: {
      userId: true,
    },
  });

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== session.user.id) {
    return "Not authorized.";
  }

  // database mutation
  try {
    await prisma.pet.delete({ where: { id: validatedPetId.data } });
  } catch (error) {
    return { message: "Couldn't delete the pet" };
  }

  revalidatePath("/app", "layout");
}
