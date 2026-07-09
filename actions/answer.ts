"use server";

import { prisma } from "@/lib/prisma";

import { isTimeUp, submitAttempt } from "@/services/attempt.service";

export async function saveAnswerAction(
  attemptId: string,
  questionId: number,
  optionId: number,
) {
  if (await isTimeUp(attemptId)) {
    await submitAttempt(attemptId);

    throw new Error("Waktu habis");
  }

  const existing = await prisma.answers.findFirst({
    where: {
      attempt_id: attemptId,
      question_id: questionId,
    },
  });

  if (existing) {
    await prisma.answers.update({
      where: {
        id: existing.id,
      },
      data: {
        option_id: optionId,
      },
    });
  } else {
    await prisma.answers.create({
      data: {
        id: crypto.randomUUID(),
        attempt_id: attemptId,
        question_id: questionId,
        option_id: optionId,
      },
    });
  }

  return {
    success: true,
  };
}

export async function getAnswersAction(attemptId: string) {
  if (await isTimeUp(attemptId)) {
    await submitAttempt(attemptId);
  }

  return prisma.answers.findMany({
    where: {
      attempt_id: attemptId,
    },
    select: {
      question_id: true,
      option_id: true,
    },
  });
}
