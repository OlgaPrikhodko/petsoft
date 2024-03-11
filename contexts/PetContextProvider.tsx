"use client";

import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  setSelectedPetId: React.Dispatch<React.SetStateAction<null>>;
};
export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: {
  data: Pet[];
  children: React.ReactNode;
}) {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState(null);

  return (
    <PetContext.Provider value={{ pets, selectedPetId, setSelectedPetId }}>
      {children}
    </PetContext.Provider>
  );
}
