"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      text: "Platform ini sangat membantu saya memahami materi dengan cara yang menyenangkan dan mudah diikuti.",
      name: "Claude David",
      role: "Full Stack Master",
      image: "https://picsum.photos/100?1",
    },
    {
      text: "Materi kursusnya lengkap dan mentor sangat responsif. Sangat direkomendasikan!",
      name: "Thomas Jefferson",
      role: "UI Expert",
      image: "https://picsum.photos/100?2",
    },
    {
      text: "Belajar di sini membuat saya lebih percaya diri untuk terjun ke dunia profesional.",
      name: "Stella Blair",
      role: "Digital Animator",
      image: "https://picsum.photos/100?3",
    },
  ];

  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT — SLIDER */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[index].name}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl"
            >
              <p className="mb-6 text-lg leading-relaxed">
                "{testimonials[index].text}"
              </p>

              <div className="flex items-center gap-4">
                <Image
                  src={testimonials[index].image}
                  alt={testimonials[index].name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover border-2 border-white"
                />

                <div>
                  <p className="font-semibold">{testimonials[index].name}</p>

                  <p className="text-white/80 text-sm">
                    {testimonials[index].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex gap-2 mt-6 justify-center">
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.name}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === index ? "bg-indigo-600" : "bg-gray-300"
                }`}
                aria-label={`Testimoni ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — TEXT */}
        <div>
          <p className="text-indigo-600 font-semibold mb-2">Testimonials</p>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Apa Kata Mereka?
          </h2>

          <p className="text-gray-600">
            Banyak siswa telah merasakan manfaat dari platform kami. Kami
            berkomitmen memberikan pengalaman belajar terbaik dengan metode yang
            modern dan efektif.
          </p>
        </div>
      </div>
    </section>
  );
}
