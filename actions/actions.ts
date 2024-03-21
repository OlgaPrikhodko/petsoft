"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { signIn, signOut } from "@/lib/auth";
import { sleep } from "@/lib/utils";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validations";
import { checkAuth, getPetById } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";

// --------- User actions ---------------------

export async function signUp(prevState: unknown, formData: unknown) {
  await sleep(2000);
  // check if formData is FormData type
  if (!(formData instanceof FormData)) {
    return { message: "Invalid form data" };
  }

  // convert formData to a plain Object
  const formDataEntries = Object.fromEntries(formData.entries());

  // validation
  const validatedFormData = authSchema.safeParse(formDataEntries);
  if (!validatedFormData.success) {
    return { message: "Invalid form data" };
  }

  const { email, password } = validatedFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Email already exists." };
      }
    }

    return { message: "Could not create user." };
  }

  await signIn("credentials", formData);
}

export async function logIn(prevState: unknown, formData: unknown) {
  await sleep(2000);

  if (!(formData instanceof FormData)) {
    return { message: "Invalid form data." };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { message: "Invalid credentials" };
        }
        default: {
          return { message: "Could not sign in" };
        }
      }
    }

    throw error; // nextjs redirects throw error, so need to rethrow it
  }
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

// --------- Pet actions ---------------------

export async function addPet(newPet: unknown) {
  await sleep(2000);

  const session = await checkAuth();

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
  const session = await checkAuth();

  // validation
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatePet = petFormSchema.safeParse(newPet);

  if (!validatedPetId.success || !validatePet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  // authorization check
  const pet = await getPetById(validatedPetId.data);

  if (!pet) {
    return { message: "Pet not found" };
  }

  if (pet.userId !== session.user?.id) {
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
  const session = await checkAuth();

  // validation
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid pet id",
    };
  }

  // authorization check (user belongs to pet)
  const pet = await getPetById(validatedPetId.data);

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== session.user?.id) {
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
