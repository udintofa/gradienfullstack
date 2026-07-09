"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

import { getActiveAttempt, submitAttempt } from "@/services/attempt.service";

export async function startTryoutAction(tryoutId: number) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const active = await getActiveAttempt(user.userId, tryoutId);

  if (active) {
    return {
      attempt_id: active.id,
      already_exists: true,
    };
  }

  const attemptId = crypto.randomUUID();

  await prisma.attempts.create({
    data: {
      id: attemptId,
      user_id: user.userId,
      tryout_id: tryoutId,
    },
  });

  return {
    attempt_id: attemptId,
    already_exists: false,
  };
}

export async function submitAttemptAction(attemptId: string) {
  const score = await submitAttempt(attemptId);

  return {
    score,
  };
}
