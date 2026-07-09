import { prisma } from "@/lib/prisma";

type OptionInput = {
  text: string;
  isCorrect: boolean;
};

export async function createQuestion(
  subtryoutId: number,
  data: {
    text: string;
    options: OptionInput[];
    explanation?: string;
    videoUrl?: string;
  },
) {
  return prisma.$transaction(async (tx) => {
    const question = await tx.questions.create({
      data: {
        sub_tryout_id: subtryoutId,
        text: data.text,
        explanation: data.explanation || "",
        video_url: data.videoUrl || "",
      },
    });

    await tx.options.createMany({
      data: data.options.map((option) => ({
        question_id: question.id,
        text: option.text,
        is_correct: option.isCorrect,
      })),
    });

    return question;
  });
}

export async function getQuestionsBySubtryout(subtryoutId: number) {
  return prisma.questions.findMany({
    where: {
      sub_tryout_id: subtryoutId,
    },
    include: {
      options: {
        select: {
          id: true,
          text: true,
          is_correct: true,
        },
      },
    },
  });
}

export async function updateQuestion(
  questionId: number,
  data: {
    text: string;
    options: OptionInput[];
    explanation?: string;
    videoUrl?: string;
  },
) {
  return prisma.$transaction(async (tx) => {
    await tx.questions.update({
      where: {
        id: questionId,
      },
      data: {
        text: data.text,
        explanation: data.explanation || "",
        video_url: data.videoUrl || "",
      },
    });

    await tx.options.deleteMany({
      where: {
        question_id: questionId,
      },
    });

    await tx.options.createMany({
      data: data.options.map((option) => ({
        question_id: questionId,
        text: option.text,
        is_correct: option.isCorrect,
      })),
    });
  });
}

export async function deleteQuestion(questionId: number) {
  return prisma.questions.delete({
    where: {
      id: questionId,
    },
  });
}
