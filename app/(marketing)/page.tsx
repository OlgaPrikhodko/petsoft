import previewImage from "@/public/petsoft-preview.png";

import Image from "next/image";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <main className="bg-[#5dc9a8] min-h-screen flex items-center flex-col md:px-10 md:flex-row gap-x-10 justify-center">
      <Image
        src={previewImage}
        alt="Preview of PetSoft"
        priority
        sizes="100vw"
      />

      <div>
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Manage you <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>

        <p className="text-2xl font-medium max-w-[600px]">
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for $299
        </p>
        <div className="mt-10">
          <button>Sign up</button>
        </div>
      </div>
    </main>
  );
}
