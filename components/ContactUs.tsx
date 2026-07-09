"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    window.location.href =
      `mailto:info@bimbel.com?subject=Konsultasi Program UTBK&body=` +
      `Nama: ${encodeURIComponent(name)}%0D%0A` +
      `Email: ${encodeURIComponent(email)}%0D%0A%0D%0A` +
      `Pesan:%0D%0A${encodeURIComponent(message)}`;
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-purple-600 font-semibold uppercase tracking-wider">
            Hubungi Kami
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Siap Mulai Perjalanan Lolos UTBK?
          </h2>

          <p className="text-gray-600 mb-8">
            Punya pertanyaan tentang program belajar, tryout, atau materi? Tim
            kami siap membantu kamu memilih kelas terbaik sesuai target kampus
            impianmu 🎯
          </p>

          {/* SPECIAL OFFER CARD */}
          <div className="relative bg-purple-600 text-white p-6 rounded-2xl shadow-lg overflow-hidden">
            <div className="absolute -top-6 -left-6 bg-white text-purple-600 w-20 h-20 rounded-full flex flex-col items-center justify-center font-bold shadow">
              <span className="text-xs">DISKON</span>
              <span className="text-lg">50%</span>
            </div>

            <p className="text-sm opacity-90">Promo Terbatas</p>

            <h4 className="text-xl font-bold mt-2">
              Konsultasi & Kelas Premium Diskon 50%!
            </h4>

            <p className="text-sm mt-1 opacity-90">
              Dapatkan akses materi lengkap, tryout prediksi, dan mentoring.
            </p>

            <button
              type="button"
              className="mt-4 bg-white text-purple-600 p-3 rounded-full hover:scale-105 transition"
              aria-label="Lihat promo"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-slate-50 p-8 rounded-2xl shadow-md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              type="text"
              placeholder="Nama Lengkap..."
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email Aktif..."
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <textarea
              name="message"
              placeholder="Tulis pertanyaan kamu di sini..."
              rows={4}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Kirim Pesan Sekarang 🚀
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
