"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between h-16 px-6 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2"
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl cursor-pointer text-white">AIR</span>
        </Link>
      </motion.div>

      <nav className="flex items-center gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="hidden md:flex items-center gap-6"
        >
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/" ? "text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            href="/chat"
            className={`text-sm font-medium transition-colors ${
              pathname === "/chat" ? "text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Chat
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors ${
              pathname === "/about" ? "text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            About
          </Link>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-zinc-900 px-4 py-2 rounded-md text-sm font-medium"
          onClick={() => router.push("/chat")}
        >
          Try AIR
        </motion.button>
      </nav>
    </header>
  );
}
