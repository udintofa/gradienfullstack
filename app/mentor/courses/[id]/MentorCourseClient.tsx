"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

import { ArrowLeft } from "lucide-react";

import {
  createMaterialsAction,
  updateMaterialAction,
  deleteMaterialAction,
} from "@/actions/material";

import {
  createTryoutsAction,
  updateTryoutAction,
  deleteTryoutAction,
} from "@/actions/tryout";

type Material = {
  id: number;
  course_id: number;
  title: string;
  content: string;
  video_url: string;
};

type Tryout = {
  id: number;
  course_id: number;
  title: string;
  description: string;
  duration_minutes: number;
};

type Course = {
  id: number;
  title: string;
  description: string | null;
};

type Props = {
  courseId: number;
  course: Course;
  initialMaterials: Material[];
  initialTryouts: Tryout[];
};

export default function MentorCourseClient({
  courseId,
  course,
  initialMaterials,
  initialTryouts,
}: Props) {
  const router = useRouter();

  const [materials] = useState(initialMaterials);
  const [tryouts] = useState(initialTryouts);

  // =========================
  // ADD MATERIAL
  // =========================

  async function handleAddMaterial() {
    const { value } = await Swal.fire({
      title: "Tambah Material",
      html: `
        <input id="title" class="swal2-input" placeholder="Title">

        <textarea
          id="content"
          class="swal2-textarea"
          placeholder="Content"
        ></textarea>

        <input
          id="video"
          class="swal2-input"
          placeholder="Youtube URL"
        >
      `,
      showCancelButton: true,
      preConfirm: () => ({
        title: (document.getElementById("title") as HTMLInputElement).value,
        content: (document.getElementById("content") as HTMLTextAreaElement)
          .value,
        video_url: (document.getElementById("video") as HTMLInputElement).value,
      }),
    });

    if (!value) return;

    await createMaterialsAction(courseId, [
      {
        course_id: courseId,
        title: value.title,
        content: value.content,
        video_url: value.video_url,
      },
    ]);

    await Swal.fire("Berhasil", "Material berhasil ditambahkan", "success");

    router.refresh();
  }

  // =========================
  // EDIT MATERIAL
  // =========================

  async function handleEditMaterial(material: Material) {
    const { value } = await Swal.fire({
      title: "Edit Material",
      html: `
        <input
          id="title"
          class="swal2-input"
          value="${material.title}"
        >

        <textarea
          id="content"
          class="swal2-textarea"
        >${material.content}</textarea>

        <input
          id="video"
          class="swal2-input"
          value="${material.video_url}"
        >
      `,
      showCancelButton: true,
      preConfirm: () => ({
        title: (document.getElementById("title") as HTMLInputElement).value,
        content: (document.getElementById("content") as HTMLTextAreaElement)
          .value,
        video_url: (document.getElementById("video") as HTMLInputElement).value,
      }),
    });

    if (!value) return;

    const formData = new FormData();

    formData.append("title", value.title);
    formData.append("content", value.content);
    formData.append("video_url", value.video_url);

    await updateMaterialAction(courseId, material.id, formData);

    await Swal.fire("Berhasil", "Material berhasil diupdate", "success");

    router.refresh();
  }

  // =========================
  // DELETE MATERIAL
  // =========================

  async function handleDeleteMaterial(materialId: number) {
    const result = await Swal.fire({
      title: "Hapus Material?",
      text: "Material yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    await deleteMaterialAction(courseId, materialId);

    await Swal.fire("Berhasil", "Material berhasil dihapus", "success");

    router.refresh();
  }

  // =========================
  // ADD TRYOUT
  // =========================

  async function handleAddTryout() {
    const { value } = await Swal.fire({
      title: "Tambah Tryout",
      html: `
        <input
          id="title"
          class="swal2-input"
          placeholder="Title"
        >

        <textarea
          id="description"
          class="swal2-textarea"
          placeholder="Description"
        ></textarea>

        <input
          id="duration"
          type="number"
          class="swal2-input"
          placeholder="Durasi (menit)"
        >
      `,
      showCancelButton: true,
      preConfirm: () => ({
        title: (document.getElementById("title") as HTMLInputElement).value,
        description: (
          document.getElementById("description") as HTMLTextAreaElement
        ).value,
        duration_minutes: Number(
          (document.getElementById("duration") as HTMLInputElement).value,
        ),
      }),
    });

    if (!value) return;

    await createTryoutsAction(courseId, [
      {
        course_id: courseId,
        title: value.title,
        description: value.description,
        duration_minutes: value.duration_minutes,
      },
    ]);

    await Swal.fire("Berhasil", "Tryout berhasil ditambahkan", "success");

    router.refresh();
  }

  // =========================
  // EDIT TRYOUT
  // =========================

  async function handleEditTryout(tryout: Tryout) {
    const { value } = await Swal.fire({
      title: "Edit Tryout",
      html: `
        <input
          id="title"
          class="swal2-input"
          value="${tryout.title}"
        >

        <textarea
          id="description"
          class="swal2-textarea"
        >${tryout.description}</textarea>

        <input
          id="duration"
          type="number"
          class="swal2-input"
          value="${tryout.duration_minutes}"
        >
      `,
      showCancelButton: true,
      preConfirm: () => ({
        title: (document.getElementById("title") as HTMLInputElement).value,
        description: (
          document.getElementById("description") as HTMLTextAreaElement
        ).value,
        duration_minutes: Number(
          (document.getElementById("duration") as HTMLInputElement).value,
        ),
      }),
    });

    if (!value) return;

    const formData = new FormData();

    formData.append("title", value.title);
    formData.append("description", value.description);
    formData.append("duration_minutes", String(value.duration_minutes));

    await updateTryoutAction(courseId, tryout.id, formData);

    await Swal.fire("Berhasil", "Tryout berhasil diupdate", "success");

    router.refresh();
  }

  // =========================
  // DELETE TRYOUT
  // =========================

  async function handleDeleteTryout(tryoutId: number) {
    const result = await Swal.fire({
      title: "Hapus Tryout?",
      text: "Tryout yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    await deleteTryoutAction(courseId, tryoutId);

    await Swal.fire("Berhasil", "Tryout berhasil dihapus", "success");

    router.refresh();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Link
          href="/mentor/courses"
          className="inline-flex items-center gap-2 text-indigo-600 hover:underline mb-8"
        >
          <ArrowLeft size={18} />
          Kembali ke Courses
        </Link>

        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>

        <p className="text-gray-500 mb-10">
          {course.description || "Tidak ada deskripsi."}
        </p>

        {/* ================= MATERIAL ================= */}

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">Materials</h2>

          <button
            onClick={handleAddMaterial}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            + Add Material
          </button>
        </div>

        <div className="space-y-4 mb-12">
          {materials.length === 0 ? (
            <div className="text-gray-500">Belum ada material.</div>
          ) : (
            materials.map((material) => (
              <div
                key={material.id}
                className="border rounded-xl bg-white p-5 shadow-sm"
              >
                <h3 className="font-semibold text-lg">{material.title}</h3>

                <p className="text-gray-600 mt-2 whitespace-pre-wrap">
                  {material.content}
                </p>

                <a
                  href={material.video_url}
                  target="_blank"
                  className="text-blue-600 hover:underline block mt-3"
                >
                  {material.video_url}
                </a>

                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => handleEditMaterial(material)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteMaterial(material.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ================= TRYOUT ================= */}

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">Tryouts</h2>

          <button
            onClick={handleAddTryout}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            + Add Tryout
          </button>
        </div>

        <div className="space-y-4">
          {tryouts.length === 0 ? (
            <div className="text-gray-500">Belum ada tryout.</div>
          ) : (
            tryouts.map((tryout) => (
              <div
                key={tryout.id}
                onClick={() => router.push(`/mentor/tryouts/${tryout.id}`)}
                className="border rounded-xl bg-white p-5 shadow-sm cursor-pointer hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg">{tryout.title}</h3>

                <p className="text-gray-600 mt-2">{tryout.description}</p>

                <p className="text-sm text-gray-500 mt-3">
                  Durasi: {tryout.duration_minutes} menit
                </p>

                <div className="flex gap-2 mt-5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditTryout(tryout);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTryout(tryout.id);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
