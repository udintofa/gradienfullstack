"use client";

import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-3">GradienNol</h2>

            <p className="text-gray-400 mb-4">
              Platform belajar UTBK modern dengan materi terstruktur, tryout
              prediksi, dan pembahasan lengkap untuk membantu kamu mencapai
              kampus impian 🎯
            </p>

            <p className="text-sm text-gray-500">
              🚀 Belajar lebih efektif, hasil lebih maksimal.
            </p>
          </motion.div>

          {/* LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Navigasi</h3>

            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-white transition">
                  Beranda
                </a>
              </li>

              <li>
                <a href="#features" className="hover:text-white transition">
                  Fitur
                </a>
              </li>

              <li>
                <a href="#courses" className="hover:text-white transition">
                  Program Belajar
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-white transition">
                  Kontak
                </a>
              </li>
            </ul>
          </motion.div>

          {/* SOCIAL */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Ikuti Kami</h3>

            <p className="text-gray-400 text-sm mb-4">
              Dapatkan tips belajar, info UTBK terbaru, dan update tryout.
            </p>

            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="bg-slate-800 p-3 rounded-lg hover:bg-purple-600 transition"
              >
                <FaFacebook size={18} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="bg-slate-800 p-3 rounded-lg hover:bg-purple-600 transition"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="bg-slate-800 p-3 rounded-lg hover:bg-purple-600 transition"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="bg-slate-800 p-3 rounded-lg hover:bg-purple-600 transition"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-slate-700 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} GradienNol. All rights reserved.
          <span className="block mt-1 text-gray-500">
            Dibuat dengan ❤️ untuk pejuang UTBK Indonesia
          </span>
        </div>
      </div>
    </footer>
  );
}
