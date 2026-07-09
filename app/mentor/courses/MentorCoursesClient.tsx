"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import {
  createCourseAction,
  updateCourseAction,
  deleteCourseAction,
} from "@/actions/course";

type Course = {
  id: number;
  title: string;
  description: string | null;
};

type Props = {
  initialCourses: Course[];
};

export default function MentorCoursesClient({ initialCourses }: Props) {
  const router = useRouter();

  const [courses] = useState(initialCourses);

  async function handleAddCourse() {
    const { value } = await Swal.fire({
      title: "Tambah Course",
      html: `
        <input id="title" class="swal2-input" placeholder="Title">
        <textarea id="description" class="swal2-textarea" placeholder="Description"></textarea>
      `,
      showCancelButton: true,
      preConfirm: () => ({
        title: (document.getElementById("title") as HTMLInputElement).value,
        description: (
          document.getElementById("description") as HTMLTextAreaElement
        ).value,
      }),
    });

    if (!value) return;

    const formData = new FormData();

    formData.append("title", value.title);
    formData.append("description", value.description);

    await createCourseAction(formData);

    router.refresh();
  }

  async function handleEdit(course: Course) {
    const { value } = await Swal.fire({
      title: "Edit Course",
      html: `
        <input id="title" class="swal2-input" value="${course.title}">
        <textarea id="description" class="swal2-textarea">${course.description ?? ""}</textarea>
      `,
      showCancelButton: true,
      preConfirm: () => ({
        title: (document.getElementById("title") as HTMLInputElement).value,
        description: (
          document.getElementById("description") as HTMLTextAreaElement
        ).value,
      }),
    });

    if (!value) return;

    const formData = new FormData();

    formData.append("title", value.title);
    formData.append("description", value.description);

    await updateCourseAction(course.id, formData);

    router.refresh();
  }

  async function handleDelete(id: number) {
    const result = await Swal.fire({
      title: "Hapus Course?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    await deleteCourseAction(id);

    router.refresh();
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>

      <button
        onClick={handleAddCourse}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-5"
      >
        + Add Course
      </button>

      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => router.push(`/mentor/courses/${course.id}`)}
            className="border rounded-lg p-5 cursor-pointer hover:bg-gray-50 transition"
          >
            <h2 className="font-semibold">{course.title}</h2>

            <p className="text-gray-500">{course.description}</p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(course);
                }}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(course.id);
                }}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push("/dashboard")}
        className="mt-8 px-5 py-2 bg-blue-600 text-white rounded"
      >
        Ke Dashboard Peserta
      </button>
    </div>
  );
}
