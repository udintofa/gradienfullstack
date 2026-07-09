"use server";

import { revalidatePath } from "next/cache";

import {
  createCourse,
  updateCourse,
  deleteCourse,
} from "@/services/course.service";

import { requireRole } from "@/lib/permission";

export async function createCourseAction(formData: FormData) {
  await requireRole("admin", "mentor");

  const title = (formData.get("title") as string)?.trim();
  const description =
    (formData.get("description") as string)?.trim() || undefined;

  if (!title) {
    throw new Error("Title wajib diisi");
  }

  const course = await createCourse(title, description);

  revalidatePath("/mentor/courses");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Course berhasil dibuat",
    course,
  };
}

export async function updateCourseAction(id: number, formData: FormData) {
  await requireRole("admin", "mentor");

  const title = (formData.get("title") as string)?.trim();
  const description =
    (formData.get("description") as string)?.trim() || undefined;

  const course = await updateCourse(id, title, description);

  revalidatePath("/mentor/courses");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Course berhasil diupdate",
    course,
  };
}

export async function deleteCourseAction(id: number) {
  await requireRole("admin", "mentor");

  await deleteCourse(id);

  revalidatePath("/mentor/courses");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Course berhasil dihapus",
  };
}
