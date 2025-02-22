"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./loading";

export function Providers({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  console.log("status: ", status);

  useEffect(() => {
    if (
      status === "unauthenticated" &&
      pathname !== "/auth/login" &&
      pathname !== "/auth/signup"
    ) {
      router.push("/");
      return;
    }

    if (status === "authenticated") {
      if (pathname === "/auth/login" || pathname === "/auth/signup") {
        router.replace("/protected");
        return;
      }
    }
  }, [status, pathname, router]);

  if (status === "loading") return <Loading />;

  return <>{children}</>;
}
