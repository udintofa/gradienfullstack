"use server";

import { revalidatePath } from "next/cache";

import { requireRole } from "@/lib/permission";

import {
  createTryouts,
  updateTryout,
  deleteTryout,
} from "@/services/tryout.service";

export async function createTryoutsAction(
  courseId: number,
  tryouts: {
    course_id: number;
    title: string;
    description: string;
    duration_minutes: number;
  }[],
) {
  await requireRole("admin", "mentor");

  if (!Array.isArray(tryouts) || tryouts.length === 0) {
    throw new Error("Data tryout tidak boleh kosong");
  }

  for (let i = 0; i < tryouts.length; i++) {
    const item = tryouts[i];

    if (
      !item.course_id ||
      !item.title ||
      !item.description ||
      !item.duration_minutes
    ) {
      throw new Error(`Data ke-${i + 1} tidak lengkap`);
    }

    if (item.duration_minutes <= 0) {
      throw new Error(`Data ke-${i + 1} duration_minutes harus lebih dari 0`);
    }
  }

  await createTryouts(tryouts);

  revalidatePath(`/mentor/courses/${courseId}`);
  revalidatePath("/dashboard");

  return {
    success: true,
    message: `${tryouts.length} tryout berhasil dibuat`,
  };
}

export async function updateTryoutAction(
  courseId: number,
  id: number,
  formData: FormData,
) {
  await requireRole("admin", "mentor");

  await updateTryout(id, {
    title: (formData.get("title") as string)?.trim(),
    description: (formData.get("description") as string)?.trim(),
    duration_minutes: Number(formData.get("duration_minutes")),
  });

  revalidatePath(`/mentor/courses/${courseId}`);
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Tryout berhasil diupdate",
  };
}

export async function deleteTryoutAction(courseId: number, id: number) {
  await requireRole("admin", "mentor");

  await deleteTryout(id);

  revalidatePath(`/mentor/courses/${courseId}`);
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Tryout berhasil dihapus",
  };
}
