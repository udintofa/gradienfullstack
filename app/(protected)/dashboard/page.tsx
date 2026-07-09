import Link from "next/link";
import { redirect } from "next/navigation";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { getMeFromCookie } from "@/lib/auth";
import { getAllCourses } from "@/services/course.service";

export default async function DashboardPage() {
  const user = await getMeFromCookie();

  if (!user) {
    redirect("/login");
  }

  const courses = await getAllCourses();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <DashboardNavbar />

      {/* CONTENT */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        {/* WELCOME */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Selamat datang, {user.full_name} 👋
          </h2>

          <p className="text-gray-500 mt-2">
            Yuk lanjutkan perjalanan belajarmu hari ini 🚀
          </p>
        </div>

        {/* STATS */}
        {/*
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Course" value={courses.length} />
          <StatCard title="Course Aktif" value={courses.length} />
          <StatCard title="Progress" value="0%" />
        </div>
        */}

        {/* COURSE LIST */}
        <h3 className="text-xl font-semibold mb-4">
          Course yang bisa dipelajari
        </h3>

        {courses.length === 0 ? (
          <p className="text-gray-500">Belum ada course yang tersedia.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition"
              >
                <h4 className="font-semibold text-lg mb-2">{course.title}</h4>

                <p className="text-gray-500 text-sm mb-4">
                  {course.description || "Belajar skill baru yang menarik."}
                </p>

                <Link
                  href={`/course/${course.id}`}
                  className="text-indigo-600 font-medium text-sm hover:underline"
                >
                  Mulai Belajar →
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t mt-10">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Learning App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <p className="text-gray-500 text-sm">{title}</p>

      <h3 className="text-2xl font-bold text-indigo-600 mt-2">{value}</h3>
    </div>
  );
}
