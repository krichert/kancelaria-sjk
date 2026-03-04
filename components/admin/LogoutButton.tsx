"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Błąd wylogowania:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-6 py-3 rounded-lg border border-red-500/40 text-sm font-light text-red-400 hover:bg-red-500/20 transition-colors"
    >
      Wyloguj
    </button>
  );
}
