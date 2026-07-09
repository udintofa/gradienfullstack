import Link from "next/link";

export default function MentorPage() {
  return (
    <>
      <h1>Halaman Mentor</h1>
      <Link
        className="btn btn-primary mt-4 bg-blue-600 text-white px-4 py-2 rounded mx-5"
        href="/mentor/courses"
      >
        Courses
      </Link>
    </>
  );
}
