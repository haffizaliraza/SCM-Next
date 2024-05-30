// pages/courses/[id].js

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AssignForm from "./../../components/AssignForm";

export default function CourseDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchCourseDetails(id);
    }
  }, [id]);

  const fetchCourseDetails = async (courseId) => {
    try {
      const response = await fetch(`/api/courses/${courseId}`);

      if (response.ok) {
        const data = await response.json();
        setCourse(data);
      } else {
        setError("Failed to fetch course details");
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
      setError("Failed to fetch course details");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignmentSuccess = (updatedCourse) => {
    setCourse(updatedCourse);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <h1 className="text-2xl mb-4">Course Detail</h1>
      {course ? (
        <div>
          <h2 className="text-xl font-semibold">{course.title}</h2>
          <p className="mb-2">Course ID: {course.id}</p>
          <p className="mb-2">
            Teacher ID:{" "}
            {course.teachers.length > 0 ? course.teachers[0].id : "N/A"}
          </p>
          <p className="mb-2">List of Students:</p>
          <ul className="list-disc ml-6">
            {course.students.map((student) => (
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
          <AssignForm courseId={course.id} onAssign={handleAssignmentSuccess} />
        </div>
      ) : (
        <div>Course not found</div>
      )}
      <div className="mt-4">
        <a href="/dashboard" className="text-indigo-600 hover:underline">
          Back
        </a>
      </div>
    </div>
  );
}
