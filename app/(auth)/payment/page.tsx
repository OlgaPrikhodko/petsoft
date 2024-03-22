"use client";

import { createCheckoutSession } from "@/actions/payment-actions";
import H1 from "@/components/H1";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function PaymentPage({ searchParams }: PageProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <main className="space-y-10 text-center">
      <H1>PetSoft access requires payment</H1>

      {!searchParams.success && (
        <Button
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => await createCheckoutSession());
          }}
        >
          Buy lifetime access for $299
        </Button>
      )}

      {searchParams.success && (
        <p className="taxt-sm text-green-700">
          Congratulation! Payment is successful! Now you have lifetime access to
          PetSoft.
        </p>
      )}

      {searchParams.cancelled && (
        <p className="text-sm text-red-700">
          Payment cancelled. You can try again.
        </p>
      )}
    </main>
  );
}
