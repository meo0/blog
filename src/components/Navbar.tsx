"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60 border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight text-gray-900 dark:text-white transition-colors">
          blog.meo0
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-4">
            <Link
              href="/search"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Search
            </Link>
          </nav>
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
