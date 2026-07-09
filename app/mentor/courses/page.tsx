import { getAllCourses } from "@/services/course.service";
import MentorCoursesClient from "./MentorCoursesClient";

export default async function MentorCoursesPage() {
  const courses = await getAllCourses();

  return <MentorCoursesClient initialCourses={courses} />;
}
