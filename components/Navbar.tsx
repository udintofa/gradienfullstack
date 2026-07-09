"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menuItems = ["Home", "Services", "Courses", "Team"];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-white/70 border-b border-white/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          GradienNol
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <li key={item} className="relative group">
              <Link
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 font-medium transition"
              >
                {item}
              </Link>

              {/* Animated underline */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}

          {/* CTA Button */}
          <Link
            href="/login"
            className="ml-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-xl font-medium shadow hover:shadow-lg transition"
          >
            Mulai Sekarang
          </Link>
        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-white/90 backdrop-blur border-t border-gray-200"
          >
            <ul className="flex flex-col px-6 py-6 gap-4">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="block text-gray-700 font-medium py-2"
                    onClick={() => setOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}

              <Link
                href="/login"
                className="inline-block mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl font-medium"
              >
                Mulai Sekarang
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
