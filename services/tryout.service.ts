import { prisma } from "@/lib/prisma";

export async function createTryouts(
  tryouts: {
    course_id: number;
    title: string;
    description: string;
    duration_minutes: number;
  }[],
) {
  return prisma.tryouts.createMany({
    data: tryouts,
  });
}

export async function getTryoutsByCourse(courseId: number) {
  return prisma.tryouts.findMany({
    where: {
      course_id: courseId,
    },
    select: {
      id: true,
      course_id: true,
      title: true,
      description: true,
      duration_minutes: true,
      created_at: true,
    },
    orderBy: {
      created_at: "asc",
    },
  });
}

export async function getTryoutById(id: number) {
  return prisma.tryouts.findUnique({
    where: {
      id,
    },
  });
}

export async function updateTryout(
  id: number,
  data: {
    title?: string;
    description?: string;
    duration_minutes?: number;
  },
) {
  return prisma.tryouts.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteTryout(id: number) {
  return prisma.tryouts.delete({
    where: {
      id,
    },
  });
}
