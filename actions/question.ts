"use server";

import { revalidatePath } from "next/cache";

import { requireRole } from "@/lib/permission";

import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "@/services/question.service";

export async function createQuestionAction(
  subtryoutId: number,
  data: {
    text: string;
    options: {
      text: string;
      isCorrect: boolean;
    }[];
    explanation?: string;
    videoUrl?: string;
  },
) {
  await requireRole("admin", "mentor");

  if (!subtryoutId) {
    throw new Error("Subtryout tidak valid");
  }

  if (!data.text.trim()) {
    throw new Error("Soal wajib diisi");
  }

  if (!data.options || data.options.length < 2) {
    throw new Error("Minimal terdapat 2 pilihan jawaban");
  }

  const question = await createQuestion(subtryoutId, data);

  revalidatePath("/mentor/subtryouts");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Soal berhasil dibuat",
    question,
  };
}

export async function updateQuestionAction(
  questionId: number,
  data: {
    text: string;
    options: {
      text: string;
      isCorrect: boolean;
    }[];
    explanation?: string;
    videoUrl?: string;
  },
) {
  await requireRole("admin", "mentor");

  if (!data.text.trim()) {
    throw new Error("Soal wajib diisi");
  }

  if (!data.options || data.options.length < 2) {
    throw new Error("Minimal terdapat 2 pilihan jawaban");
  }

  const question = await updateQuestion(questionId, data);

  revalidatePath("/mentor/subtryouts");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Soal berhasil diupdate",
    question,
  };
}

export async function deleteQuestionAction(questionId: number) {
  await requireRole("admin", "mentor");

  await deleteQuestion(questionId);

  revalidatePath("/mentor/subtryouts");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Soal berhasil dihapus",
  };
}
