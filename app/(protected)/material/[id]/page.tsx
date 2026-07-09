import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, PlayCircle, BookOpen, Sparkles } from "lucide-react";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { getMaterialById } from "@/services/material.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MaterialDetailPage({ params }: Props) {
  const { id } = await params;

  const materialId = Number(id);

  if (Number.isNaN(materialId)) {
    notFound();
  }

  const material = await getMaterialById(materialId);

  if (!material) {
    notFound();
  }

  const videoUrl = material.video_url.replace("watch?v=", "embed/");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <DashboardNavbar />

      <div className="max-w-5xl mx-auto py-10 px-6">
        {/* Back Button */}
        <Link
          href={`/course/${material.course_id}`}
          className="inline-flex items-center gap-2 mb-6 text-indigo-600 font-medium hover:underline"
        >
          <ArrowLeft size={18} />
          Kembali
        </Link>

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen />

            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              Materi Belajar
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {material.title} 🎯
          </h1>

          <p className="text-white/90">
            Pelajari konsep dengan video interaktif dan penjelasan lengkap.
          </p>
        </div>

        {/* Video */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4 font-semibold text-gray-700">
            <PlayCircle className="text-indigo-600" />
            Video Pembelajaran
          </div>

          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src={videoUrl}
              title={material.title}
              allowFullScreen
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4 font-semibold text-gray-700">
            <Sparkles className="text-purple-600" />
            Deskripsi Materi
          </div>

          <div className="whitespace-pre-line text-gray-600 leading-relaxed">
            {material.content}
          </div>
        </div>

        {/* Progress */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-semibold text-lg mb-2">
            🚀 Tetap Semangat Belajar!
          </h3>

          <p className="text-white/90 mb-4">
            Setelah menyelesaikan materi ini, kamu bisa lanjut ke tryout untuk
            menguji pemahamanmu.
          </p>

          <div className="w-full bg-white/30 rounded-full h-3">
            <div className="bg-white h-3 rounded-full w-1/3"></div>
          </div>

          <p className="text-sm mt-2">Progress Belajar 30%</p>
        </div>
      </div>
    </div>
  );
}
