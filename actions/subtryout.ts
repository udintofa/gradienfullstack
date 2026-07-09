"use server";

import { revalidatePath } from "next/cache";

import { requireRole } from "@/lib/permission";

import {
  createSubtryout,
  updateSubtryout,
  deleteSubtryout,
} from "@/services/subtryout.service";

export async function createSubtryoutAction(
  tryoutId: number,
  data: {
    tryout_id: number;
    title: string;
    description: string;
    duration: number;
    order_number: number;
  },
) {
  await requireRole("admin", "mentor");

  if (!data.title.trim()) {
    throw new Error("Title wajib diisi");
  }

  await createSubtryout({
    tryout_id: data.tryout_id,
    title: data.title.trim(),
    description: data.description.trim(),
    duration: data.duration,
    order_number: data.order_number,
  });

  revalidatePath(`/mentor/tryouts/${tryoutId}`);
  revalidatePath(`/tryout/${tryoutId}`);

  return {
    success: true,
    message: "Subtryout berhasil dibuat",
  };
}

export async function updateSubtryoutAction(
  tryoutId: number,
  id: number,
  formData: FormData,
) {
  await requireRole("admin", "mentor");

  const title = (formData.get("title") as string)?.trim();
  const description =
    (formData.get("description") as string)?.trim() || undefined;

  await updateSubtryout(id, {
    title,
    description,
    duration: Number(formData.get("duration")),
    order_number: Number(formData.get("order_number")),
  });

  revalidatePath(`/mentor/tryouts/${tryoutId}`);
  revalidatePath(`/tryout/${tryoutId}`);

  return {
    success: true,
    message: "Subtryout berhasil diupdate",
  };
}

export async function deleteSubtryoutAction(tryoutId: number, id: number) {
  await requireRole("admin", "mentor");

  await deleteSubtryout(id);

  revalidatePath(`/mentor/tryouts/${tryoutId}`);
  revalidatePath(`/tryout/${tryoutId}`);

  return {
    success: true,
    message: "Subtryout berhasil dihapus",
  };
}
