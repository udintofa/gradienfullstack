import { prisma } from "@/lib/prisma";

export async function createCourse(title: string, description?: string) {
  return prisma.courses.create({
    data: {
      title,
      description,
    },
  });
}

export async function getAllCourses() {
  return prisma.courses.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      created_at: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

export async function getCourseById(id: number) {
  return prisma.courses.findUnique({
    where: {
      id,
    },
  });
}

export async function updateCourse(
  id: number,
  title?: string,
  description?: string,
) {
  return prisma.courses.update({
    where: {
      id,
    },
    data: {
      title,
      description,
    },
  });
}

export async function deleteCourse(id: number) {
  return prisma.courses.delete({
    where: {
      id,
    },
  });
}
