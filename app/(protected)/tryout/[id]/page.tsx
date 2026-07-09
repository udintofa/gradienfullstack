import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Trophy, BookOpen } from "lucide-react";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { getTryoutById } from "@/services/tryout.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TryoutDetailPage({ params }: Props) {
  const { id } = await params;

  const tryoutId = Number(id);

  if (Number.isNaN(tryoutId)) {
    notFound();
  }

  const tryout = await getTryoutById(tryoutId);

  if (!tryout) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <DashboardNavbar />

      <div className="max-w-3xl mx-auto p-6">
        {/* Back Button */}
        <Link
          href={`/course/${tryout.course_id}`}
          className="inline-flex items-center gap-2 mb-6 text-gray-700 hover:text-indigo-600 transition"
        >
          <ArrowLeft size={20} />
          Kembali
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🚀 {tryout.title}
            </h1>

            <p className="text-gray-600">{tryout.description}</p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-indigo-50 rounded-xl p-4 flex flex-col items-center shadow-sm">
              <Clock className="text-indigo-600 mb-2" />

              <p className="text-sm text-gray-500">Durasi</p>

              <p className="font-semibold text-indigo-700">
                {tryout.duration_minutes} menit
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 flex flex-col items-center shadow-sm">
              <BookOpen className="text-purple-600 mb-2" />

              <p className="text-sm text-gray-500">Tipe</p>

              <p className="font-semibold text-purple-700">Simulasi UTBK</p>
            </div>

            <div className="bg-pink-50 rounded-xl p-4 flex flex-col items-center shadow-sm">
              <Trophy className="text-pink-600 mb-2" />

              <p className="text-sm text-gray-500">Level</p>

              <p className="font-semibold text-pink-700">Nasional</p>
            </div>
          </div>

          {/* Alert */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
            <p className="text-sm text-yellow-800">
              ⚠️ Pastikan koneksi internet stabil sebelum memulai tryout. Timer
              akan berjalan otomatis setelah kamu menekan tombol mulai.
            </p>
          </div>

          {/* Start Button */}
          <div className="flex justify-center">
            <Link
              href={`/quiz/${tryout.id}`}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:opacity-90 transition"
            >
              🎯 Mulai Tryout Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
