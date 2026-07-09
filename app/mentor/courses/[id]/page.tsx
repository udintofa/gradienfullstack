import { notFound } from "next/navigation";

import MentorCourseClient from "./MentorCourseClient";

import { getCourseById } from "@/services/course.service";
import { getMaterialsByCourse } from "@/services/material.service";
import { getTryoutsByCourse } from "@/services/tryout.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MentorCourseDetailPage({ params }: Props) {
  const { id } = await params;

  const courseId = Number(id);

  const course = await getCourseById(courseId);

  if (!course) {
    notFound();
  }

  const materials = await getMaterialsByCourse(courseId);
  const tryouts = await getTryoutsByCourse(courseId);

  return (
    <MentorCourseClient
      courseId={courseId}
      course={course}
      initialMaterials={materials}
      initialTryouts={tryouts}
    />
  );
}
