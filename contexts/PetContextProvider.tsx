"use client";

import { addPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleChangeSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
  handleEditPet: (petId: string, newPet: Omit<Pet, "id">) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data: pets,
  children,
}: {
  data: Pet[];
  children: React.ReactNode;
}) {
  // state
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  // event handlers / actions
  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = (id: string) => {
    // setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };

  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    await addPet(newPet);
  };

  const handleEditPet = (petId: string, newPetData: Omit<Pet, "id">) => {
    // setPets((prev) =>
    //   prev.map((pet) => {
    //     if (pet.id === petId) return { id: petId, ...newPetData };
    //     return pet;
    //   }),
    // );
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
        selectedPet,
        numberOfPets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
