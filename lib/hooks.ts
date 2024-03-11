import { PetContext } from "@/contexts/PetContextProvider";
import { useContext } from "react";

export function usePetContext() {
  const context = useContext(PetContext);

  if (!context)
    throw new Error("usePetContext must be used within a PetContextProvider");

  return context;
}
