"use server";

import { revalidatePath } from "next/cache";

import { requireRole } from "@/lib/permission";

import {
  createMaterials,
  updateMaterial,
  deleteMaterial,
} from "@/services/material.service";

export async function createMaterialsAction(
  courseId: number,
  materials: {
    course_id: number;
    title: string;
    content: string;
    video_url: string;
  }[],
) {
  await requireRole("admin", "mentor");

  if (!Array.isArray(materials) || materials.length === 0) {
    throw new Error("Materials tidak boleh kosong");
  }

  for (let i = 0; i < materials.length; i++) {
    const item = materials[i];

    if (!item.course_id || !item.title || !item.content || !item.video_url) {
      throw new Error(`Data ke-${i + 1} tidak lengkap`);
    }
  }

  await createMaterials(materials);

  revalidatePath(`/mentor/courses/${courseId}`);
  revalidatePath("/dashboard");

  return {
    success: true,
    message: `${materials.length} material berhasil ditambahkan`,
  };
}

export async function updateMaterialAction(
  courseId: number,
  id: number,
  formData: FormData,
) {
  await requireRole("admin", "mentor");

  await updateMaterial(id, {
    title: (formData.get("title") as string)?.trim(),
    content: (formData.get("content") as string)?.trim(),
    video_url: (formData.get("video_url") as string)?.trim(),
  });

  revalidatePath(`/mentor/courses/${courseId}`);
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Material berhasil diupdate",
  };
}

export async function deleteMaterialAction(courseId: number, id: number) {
  await requireRole("admin", "mentor");

  await deleteMaterial(id);

  revalidatePath(`/mentor/courses/${courseId}`);
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Material berhasil dihapus",
  };
}
