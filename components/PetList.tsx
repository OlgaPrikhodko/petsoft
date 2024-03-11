import { Pet } from "@/lib/types";
import Image from "next/image";

export default function PetList({ pets }: { pets: Pet[] }) {
  return (
    <ul className="border-b border-black/[0.08] bg-white">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button className="flex h-[70px] w-full cursor-pointer items-center gap-3 px-5 text-base transition hover:bg-[#eff1f2] focus:bg-[#eff1f2]">
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
