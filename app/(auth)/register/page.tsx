"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { registerAction } from "@/actions/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [grade, setGrade] = useState("");
  const [major, setMajor] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("full_name", fullName);
    formData.append("nickname", nickname);
    formData.append("school_name", schoolName);
    formData.append("grade", grade);
    formData.append("major", major);
    formData.append("username", username);
    formData.append("password", password);

    const result = await registerAction(formData);

    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    router.push("/login");
    router.refresh();
  };

  const fields = [
    {
      label: "Nama Lengkap",
      value: fullName,
      set: setFullName,
    },
    {
      label: "Nama Panggilan",
      value: nickname,
      set: setNickname,
    },
    {
      label: "Asal Sekolah",
      value: schoolName,
      set: setSchoolName,
    },
    {
      label: "Kelas",
      value: grade,
      set: setGrade,
    },
    {
      label: "Jurusan",
      value: major,
      set: setMajor,
    },
    {
      label: "Username",
      value: username,
      set: setUsername,
    },
    {
      label: "Password",
      value: password,
      set: setPassword,
      type: "password",
    },
    {
      label: "Konfirmasi Password",
      value: confirmPassword,
      set: setConfirmPassword,
      type: "password",
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-8"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-center mb-6 text-gray-800"
        >
          Daftar Akun
        </motion.h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {fields.map((field, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
            >
              <label className="text-sm font-medium text-gray-600">
                {field.label}
              </label>

              <input
                type={field.type || "text"}
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                required
                disabled={loading}
                className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-100"
              />
            </motion.div>
          ))}

          <motion.div
            className="md:col-span-2 mt-4"
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
              },
              show: {
                opacity: 1,
                y: 0,
              },
            }}
          >
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Mendaftarkan..." : "Daftar"}
            </motion.button>
          </motion.div>

          <motion.div
            className="md:col-span-2 text-center text-sm text-gray-600"
            variants={{
              hidden: {
                opacity: 0,
              },
              show: {
                opacity: 1,
              },
            }}
          >
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Login
            </Link>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
}
