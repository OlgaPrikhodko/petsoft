"use client";

import { usePetContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function PetList() {
  const { pets, selectedPetId, handleChangeSelectedPetId } = usePetContext();

  return (
    <ul className="border-light border-b bg-white">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => {
              handleChangeSelectedPetId(pet.id);
            }}
            className={cn(
              "flex h-[70px] w-full cursor-pointer items-center gap-3 px-5 text-base transition hover:bg-[#eff1f2] focus:bg-[#eff1f2]",
              {
                "bg-[#eff1f2]": pet.id === selectedPetId,
              },
            )}
          >
            <Image
              className="h-[45px] w-[45px] rounded-full object-cover"
              width={45}
              height={45}
              alt="Pet image"
              src={pet.imageUrl}
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
