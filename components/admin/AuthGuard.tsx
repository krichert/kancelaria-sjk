"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Pomiń sprawdzanie dla strony logowania
    if (pathname?.includes("/admin/login")) {
      setIsChecking(false);
      setIsAuthenticated(true); // Ustaw jako "autentykowany" aby wyświetlić stronę logowania
      return;
    }

    // Sprawdź autentykację
    fetch("/api/auth/check")
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
      })
      .catch(() => {
        router.push("/admin/login");
      })
      .finally(() => {
        setIsChecking(false);
      });
  }, [pathname, router]);

  // Dla strony logowania, zawsze wyświetl
  if (pathname?.includes("/admin/login")) {
    return <>{children}</>;
  }

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[var(--color-black)] text-[var(--color-white)] flex items-center justify-center">
        <p className="text-lg">Sprawdzanie autoryzacji...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirect jest w toku
  }

  return <>{children}</>;
}
