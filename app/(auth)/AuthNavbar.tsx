"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthNavbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          GradienNol
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className={`px-4 py-2 rounded-lg font-medium transition ${
              pathname === "/login"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Login
          </Link>

          <Link
            href="/register"
            className={`px-4 py-2 rounded-lg font-medium transition ${
              pathname === "/register"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
