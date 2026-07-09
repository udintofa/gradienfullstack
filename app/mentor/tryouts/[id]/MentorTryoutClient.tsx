"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";

import {
  createSubtryoutAction,
  deleteSubtryoutAction,
  updateSubtryoutAction,
} from "@/actions/subtryout";

type Subtryout = {
  id: number;
  tryout_id: number;
  title: string;
  description: string | null;
  order_number: number;
  duration: number;
};

type Tryout = {
  id: number;
  title: string;
};

type Props = {
  tryoutId: number;
  tryout: Tryout;
  initialSubtryouts: Subtryout[];
};

export default function MentorTryoutClient({
  tryoutId,
  tryout,
  initialSubtryouts,
}: Props) {
  const router = useRouter();

  const [subtryouts] = useState(initialSubtryouts);

  async function handleAddSubtryout() {
    const { value } = await Swal.fire({
      title: "Add Subtryout",
      html: `
        <input id="title" class="swal2-input" placeholder="Title">
        <textarea id="desc" class="swal2-textarea" placeholder="Description"></textarea>
        <input id="order" type="number" class="swal2-input" placeholder="Order Number">
        <input id="duration" type="number" class="swal2-input" placeholder="Duration (minutes)">
      `,
      showCancelButton: true,
      preConfirm: () => {
        const popup = Swal.getPopup()!;

        const title = (
          popup.querySelector("#title") as HTMLInputElement
        ).value.trim();
        const description = (
          popup.querySelector("#desc") as HTMLTextAreaElement
        ).value.trim();
        const order = Number(
          (popup.querySelector("#order") as HTMLInputElement).value,
        );
        const duration = Number(
          (popup.querySelector("#duration") as HTMLInputElement).value,
        );

        if (!title || !description || !order || !duration) {
          Swal.showValidationMessage("Semua field wajib diisi");
          return;
        }

        return {
          title,
          description,
          order_number: order,
          duration,
        };
      },
    });

    if (!value) return;

    await createSubtryoutAction(tryoutId, {
      tryout_id: tryoutId,
      title: value.title,
      description: value.description,
      order_number: value.order_number,
      duration: value.duration,
    });

    router.refresh();

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Subtryout berhasil ditambahkan",
    });
  }

  async function handleEditSubtryout(sub: Subtryout) {
    const { value } = await Swal.fire({
      title: "Edit Subtryout",
      html: `
      <input id="title" class="swal2-input" value="${sub.title}">
      <textarea id="desc" class="swal2-textarea">${sub.description ?? ""}</textarea>
      <input id="order" type="number" class="swal2-input" value="${sub.order_number}">
      <input id="duration" type="number" class="swal2-input" value="${sub.duration}">
    `,
      showCancelButton: true,
      preConfirm: () => {
        const popup = Swal.getPopup()!;

        return {
          title: (
            popup.querySelector("#title") as HTMLInputElement
          ).value.trim(),
          description: (
            popup.querySelector("#desc") as HTMLTextAreaElement
          ).value.trim(),
          order_number: Number(
            (popup.querySelector("#order") as HTMLInputElement).value,
          ),
          duration: Number(
            (popup.querySelector("#duration") as HTMLInputElement).value,
          ),
        };
      },
    });

    if (!value) return;

    const formData = new FormData();

    formData.append("title", value.title);
    formData.append("description", value.description);
    formData.append("order_number", String(value.order_number));
    formData.append("duration", String(value.duration));

    await updateSubtryoutAction(tryoutId, sub.id, formData);

    router.refresh();

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Subtryout berhasil diupdate",
    });
  }

  async function handleDeleteSubtryout(id: number) {
    const result = await Swal.fire({
      title: "Delete Subtryout?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    await deleteSubtryoutAction(tryoutId, id);

    router.refresh();

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Subtryout berhasil dihapus",
    });
  }

  function handleBack() {
    router.back();
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-2">Tryout Detail</h1>

      <p className="text-gray-500 mb-6">{tryout.title}</p>

      <button
        onClick={handleBack}
        className="flex items-center gap-2 mb-8 text-indigo-600 hover:underline"
      >
        <ArrowLeft size={18} />
        Kembali
      </button>

      <button
        onClick={handleAddSubtryout}
        className="mb-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        + Add Subtryout
      </button>

      <div className="space-y-4">
        {subtryouts.map((sub) => (
          <div
            key={sub.id}
            onClick={() => router.push(`/mentor/subtryouts/${sub.id}`)}
            className="cursor-pointer rounded-xl border bg-gray-50 p-5 transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {sub.order_number}. {sub.title}
                </h3>

                {sub.description && (
                  <p className="mt-2 text-gray-600">{sub.description}</p>
                )}

                <p className="mt-2 text-sm text-gray-500">
                  Duration: {sub.duration} minutes
                </p>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditSubtryout(sub);
                }}
                className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSubtryout(sub.id);
                }}
                className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
