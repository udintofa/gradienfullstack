"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { logoutAction } from "@/actions/auth";

export default function DashboardNavbar() {
  const router = useRouter();

  async function handleLogout() {
    await logoutAction();

    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          Gradien Nol
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="font-medium text-gray-600 hover:text-indigo-600 transition"
          >
            Home
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 font-medium text-white hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
