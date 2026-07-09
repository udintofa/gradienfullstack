import { prisma } from "@/lib/prisma";

export async function getSubtryoutsByTryout(tryoutId: number) {
  return prisma.subtryouts.findMany({
    where: {
      tryout_id: tryoutId,
    },
    orderBy: {
      order_number: "asc",
    },
  });
}

export async function getSubtryoutById(id: number) {
  return prisma.subtryouts.findUnique({
    where: {
      id,
    },
  });
}

export async function createSubtryout(data: {
  tryout_id: number;
  title: string;
  description?: string;
  duration?: number;
  order_number?: number;
}) {
  return prisma.subtryouts.create({
    data: {
      tryout_id: data.tryout_id,
      title: data.title,
      description: data.description ?? "",
      duration: data.duration ?? 30,
      order_number: data.order_number ?? 1,
    },
  });
}

export async function updateSubtryout(
  id: number,
  data: {
    title?: string;
    description?: string;
    duration?: number;
    order_number?: number;
  },
) {
  const existing = await prisma.subtryouts.findUnique({
    where: {
      id,
    },
  });

  if (!existing) {
    throw new Error("Subtryout not found");
  }

  return prisma.subtryouts.update({
    where: {
      id,
    },
    data: {
      title: data.title,
      description: data.description,
      duration: data.duration ?? existing.duration,
      order_number: data.order_number ?? existing.order_number,
    },
  });
}

export async function deleteSubtryout(id: number) {
  const existing = await prisma.subtryouts.findUnique({
    where: {
      id,
    },
  });

  if (!existing) {
    throw new Error("Subtryout not found");
  }

  return prisma.subtryouts.delete({
    where: {
      id,
    },
  });
}
