"use client";

import { addPet, deletePet, editPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleChangeSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => Promise<void>;
  handleAddPet: (newPet: Omit<Pet, "id">) => Promise<void>;
  handleEditPet: (petId: string, newPet: Omit<Pet, "id">) => Promise<void>;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: {
  data: Pet[];
  children: React.ReactNode;
}) {
  // state
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload, id: Math.random().toString() }];
        case "edit":
          return state.map((pet) => {
            if (pet.id === payload.id) return { ...pet, ...payload.newPetData };
            return pet;
          });
        case "delete":
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    },
  );

  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  // event handlers / actions
  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = async (petId: string) => {
    setOptimisticPets({ action: "delete", payload: petId });

    const error = await deletePet(petId);
    if (error) {
      toast.warning(error.message);
      return;
    }
    setSelectedPetId(null);
  };

  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    setOptimisticPets({ action: "add", payload: newPet });
    const error = await addPet(newPet);

    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (petId: string, newPetData: Omit<Pet, "id">) => {
    setOptimisticPets({ action: "edit", payload: { id: petId, newPetData } });
    const error = await editPet(petId, newPetData);

    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
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
