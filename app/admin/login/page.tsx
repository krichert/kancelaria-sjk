"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Błąd logowania");
        setIsLoading(false);
        return;
      }

      // Przekierowanie do panelu admina
      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Błąd logowania:", error);
      setError("Wystąpił błąd podczas logowania. Spróbuj ponownie.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-black)] text-[var(--color-white)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[var(--color-black)] border border-[var(--color-white)]/20 rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-light mb-2 text-center">
            Panel administracyjny
          </h1>
          <p className="text-sm text-[var(--color-white)]/60 text-center mb-8">
            Zaloguj się, aby uzyskać dostęp
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-light mb-2 text-[var(--color-white)]"
              >
                Hasło
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-transparent border border-[var(--color-white)]/40 rounded-md text-[var(--color-white)] placeholder:text-[var(--color-white)]/40 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                placeholder="Wprowadź hasło"
                disabled={isLoading}
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-md p-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-[var(--color-accent)] text-[var(--color-black)] text-sm font-light rounded-md hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logowanie..." : "Zaloguj się"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
