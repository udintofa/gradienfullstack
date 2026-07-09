import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

import { getCourseById } from "@/services/course.service";
import { getMaterialsByCourse } from "@/services/material.service";
import { getTryoutsByCourse } from "@/services/tryout.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;

  const courseId = Number(id);

  if (Number.isNaN(courseId)) {
    notFound();
  }

  const course = await getCourseById(courseId);

  if (!course) {
    notFound();
  }

  const materials = await getMaterialsByCourse(courseId);
  const tryouts = await getTryoutsByCourse(courseId);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNavbar />

      {/* HERO */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-7 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 mb-6 text-white/90 hover:text-white transition"
          >
            <ArrowLeft size={20} />
            Kembali ke Dashboard
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {course.title}
          </h1>

          <p className="text-white/90 max-w-2xl">{course.description}</p>
        </div>
      </div>

      {/* CONTENT */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 space-y-12">
        {/* ===== MATERI ===== */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Materi</h2>

          {materials.length === 0 ? (
            <p className="text-gray-500">Belum ada materi untuk course ini.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {materials.map((materi) => (
                <Link
                  key={materi.id}
                  href={`/material/${materi.id}`}
                  className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition block"
                >
                  <h3 className="font-semibold text-lg mb-2">{materi.title}</h3>

                  <p className="text-gray-500 text-sm">
                    Klik untuk melihat materi
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ===== TRYOUT ===== */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Tryout</h2>

          {tryouts.length === 0 ? (
            <p className="text-gray-500">Belum ada tryout untuk course ini.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {tryouts.map((tryout) => (
                <Link
                  key={tryout.id}
                  href={`/tryout/${tryout.id}`}
                  className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition block"
                >
                  <h3 className="font-semibold text-lg mb-2">{tryout.title}</h3>

                  <p className="text-gray-600 text-sm mb-3">
                    {tryout.description}
                  </p>

                  <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                    {tryout.duration_minutes} menit
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Gradien Nol. All rights reserved.
      </footer>
    </div>
  );
}
