"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
}

export default function LoginButton({ children }: LoginButtonProps) {
  const router = useRouter();

  return (
    <div onClick={() => router.push("/login")}>
      {children}
    </div>
  );
}