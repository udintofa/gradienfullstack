import { prisma } from "@/lib/prisma";

export async function getResult(attemptId: string, userId: string) {
  const attempt = await prisma.attempts.findFirst({
    where: {
      id: attemptId,
      user_id: userId,
    },
    include: {
      tryouts: true,
    },
  });

  if (!attempt) {
    throw new Error("Attempt tidak ditemukan");
  }

  if (!attempt.submitted_at) {
    throw new Error("Tryout belum disubmit");
  }

  const answers = await prisma.answers.findMany({
    where: {
      attempt_id: attemptId,
    },
    include: {
      questions: true,
      options: true,
    },
  });

  return {
    tryout: {
      id: attempt.tryout_id,
      title: attempt.tryouts.title,
    },
    score: attempt.score,
    submitted_at: attempt.submitted_at,
    answers,
  };
}
