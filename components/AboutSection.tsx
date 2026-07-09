"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function About() {
  const [open, setOpen] = useState<number | null>(0);

  const items = [
    {
      title: "Mulai dari Mana?",
      content:
        "Kami menyediakan kurikulum yang terstruktur untuk membantu Anda memulai perjalanan belajar dengan mudah dan menyenangkan.",
    },
    {
      title: "Bagaimana Cara Belajar?",
      content:
        "Belajar melalui video interaktif, latihan praktik, dan komunitas yang suportif untuk meningkatkan pemahaman Anda.",
    },
    {
      title: "Kenapa Gradien Nol?",
      content:
        "Platform kami dirancang modern, mudah digunakan, dan fokus pada pengalaman belajar terbaik untuk semua usia.",
    },
    {
      title: "Apakah Ada Dukungan?",
      content:
        "Tim kami siap membantu Anda kapan saja melalui forum diskusi dan mentor profesional.",
    },
  ];

  return (
    <section className="py-18 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left font-semibold text-lg"
              >
                {item.title}

                <motion.div
                  animate={{ rotate: open === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-gray-600"
                  >
                    {item.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div>
          <p className="text-indigo-600 font-semibold mb-2">Tentang Kami</p>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Apa yang Membuat Kami Berbeda?
          </h2>

          <p className="text-gray-600 mb-6">
            Gradien Nol adalah platform edukasi interaktif yang membantu siapa
            saja belajar dengan cara yang lebih modern, fleksibel, dan
            menyenangkan.
          </p>

          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition hover:-translate-y-1">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>
    </section>
  );
}
