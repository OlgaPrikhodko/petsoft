"use client";

import Image from "next/image";
import { usePetContext } from "@/lib/hooks";
import { Pet } from "@prisma/client";
import PetButton from "./PetButton";

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex h-full w-full flex-col">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar pet={selectedPet} />
          <PetInfo pet={selectedPet} />
          <PetNotes pet={selectedPet} />
        </>
      )}
    </section>
  );
}

function EmptyView() {
  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-xl font-medium">No pet selected</p>
    </div>
  );
}

function TopBar({ pet }: { pet: Pet }) {
  const { handleCheckoutPet } = usePetContext();

  return (
    <div className="flex items-center border-b border-light bg-white px-8 py-5">
      <Image
        src={pet?.imageUrl}
        alt="Selected pet image"
        height={75}
        width={75}
        className="h-[75px] w-[75px] rounded-full object-cover"
      />
      <h2 className="ml-5 text-3xl font-semibold leading-7">{pet?.name}</h2>

      <div className="ml-auto space-x-2">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton
          actionType="checkout"
          onClick={() => {
            handleCheckoutPet(pet.id);
          }}
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
}

function PetInfo({ pet }: { pet: Pet }) {
  return (
    <div className="flex justify-around px-5 py-10 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.age}</p>
      </div>
    </div>
  );
}

function PetNotes({ pet }: { pet: Pet }) {
  return (
    <section className="mx-8 mb-9 flex-1 rounded-md border border-light bg-white px-7 py-5">
      {pet?.notes}
    </section>
  );
}
