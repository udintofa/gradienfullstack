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

  await prisma.answers.upsert({
    where: {
      attempt_id_question_id: {
        attempt_id: attemptId,
        question_id: questionId,
      },
    },
    update: {
      option_id: optionId,
    },
    create: {
      attempt_id: attemptId,
      question_id: questionId,
      option_id: optionId,
    },
  });

  return {
    success: true,
  };
}

export async function getAnswersAction(attemptId: string) {
  if (await isTimeUp(attemptId)) {
    await submitAttempt(attemptId);
  }

  return await prisma.answers.findMany({
    where: {
      attempt_id: attemptId,
    },
    select: {
      question_id: true,
      option_id: true,
    },
  });
}
