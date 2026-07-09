import { prisma } from "@/lib/prisma";

export async function isTimeUp(attemptId: string) {
  const attempt = await prisma.attempts.findUnique({
    where: {
      id: attemptId,
    },
    select: {
      started_at: true,
      submitted_at: true,
      tryouts: {
        select: {
          duration_minutes: true,
        },
      },
    },
  });

  if (!attempt) {
    throw new Error("Attempt tidak ditemukan");
  }

  if (attempt.submitted_at) {
    return true;
  }

  const endTime =
    new Date(attempt.started_at).getTime() +
    attempt.tryouts.duration_minutes * 60 * 1000;

  return Date.now() > endTime;
}

export async function submitAttempt(attemptId: string) {
  const attempt = await prisma.attempts.findUnique({
    where: {
      id: attemptId,
    },
    select: {
      submitted_at: true,
    },
  });

  if (!attempt) {
    throw new Error("Attempt tidak ditemukan");
  }

  if (attempt.submitted_at) {
    const existing = await prisma.attempts.findUnique({
      where: {
        id: attemptId,
      },
      select: {
        score: true,
      },
    });

    return existing?.score ?? 0;
  }

  const answers = await prisma.answers.findMany({
    where: {
      attempt_id: attemptId,
    },
    select: {
      options: {
        select: {
          is_correct: true,
        },
      },
    },
  });

  let score = 0;

  answers.forEach((answer) => {
    if (answer.options?.is_correct) {
      score++;
    }
  });

  await prisma.attempts.update({
    where: {
      id: attemptId,
    },
    data: {
      score,
      submitted_at: new Date(),
    },
  });

  return score;
}

export async function getActiveAttempt(userId: string, tryoutId: number) {
  const attempt = await prisma.attempts.findFirst({
    where: {
      user_id: userId,
      tryout_id: tryoutId,
      submitted_at: null,
    },
    orderBy: {
      started_at: "desc",
    },
    include: {
      tryouts: true,
    },
  });

  if (!attempt) {
    return null;
  }

  const endTime =
    new Date(attempt.started_at).getTime() +
    attempt.tryouts.duration_minutes * 60 * 1000;

  if (Date.now() > endTime) {
    await submitAttempt(attempt.id);

    return null;
  }

  return attempt;
}

export async function getRemainingTime(attemptId: string) {
  const attempt = await prisma.attempts.findUnique({
    where: {
      id: attemptId,
    },
    select: {
      started_at: true,
      submitted_at: true,
      tryouts: {
        select: {
          duration_minutes: true,
        },
      },
    },
  });

  if (!attempt) {
    throw new Error("Attempt tidak ditemukan");
  }

  if (attempt.submitted_at) {
    return {
      remaining_seconds: 0,
      is_time_up: true,
    };
  }

  const endTime =
    new Date(attempt.started_at).getTime() +
    attempt.tryouts.duration_minutes * 60 * 1000;

  const remainingMs = endTime - Date.now();

  const remainingSeconds = Math.max(Math.floor(remainingMs / 1000), 0);

  if (remainingSeconds === 0) {
    await submitAttempt(attemptId);

    return {
      remaining_seconds: 0,
      is_time_up: true,
    };
  }

  return {
    remaining_seconds: remainingSeconds,
    is_time_up: false,
  };
}
