import { prisma } from "@/lib/prisma";

export async function createMaterials(
  materials: {
    course_id: number;
    title: string;
    content: string;
    video_url: string;
  }[],
) {
  return prisma.materials.createMany({
    data: materials,
  });
}

export async function getMaterialsByCourse(courseId: number) {
  return prisma.materials.findMany({
    where: {
      course_id: courseId,
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

export async function getMaterialById(id: number) {
  return prisma.materials.findUnique({
    where: {
      id,
    },
  });
}

export async function updateMaterial(
  id: number,
  data: {
    title?: string;
    content?: string;
    video_url?: string;
  },
) {
  return prisma.materials.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteMaterial(id: number) {
  return prisma.materials.delete({
    where: {
      id,
    },
  });
}
