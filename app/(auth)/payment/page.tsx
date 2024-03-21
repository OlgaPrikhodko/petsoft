import H1 from "@/components/H1";
import { Button } from "@/components/ui/button";

export default function PaymentPage() {
  return (
    <main className="space-y-10 text-center">
      <H1>PetSoft access requires payment</H1>

      <Button> Buy lifetime access for $299 </Button>
    </main>
  );
}
