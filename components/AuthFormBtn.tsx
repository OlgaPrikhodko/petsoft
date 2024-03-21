"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type AuthFormBtnProps = {
  type: "signUp" | "logIn";
};

export default function AuthFormBtn({ type }: AuthFormBtnProps) {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4" disabled={pending}>
      {type === "logIn" ? "Log in" : "Sign up"}
    </Button>
  );
}
