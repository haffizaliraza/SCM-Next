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
    <div>
      <h1>Course Detail</h1>
      {course ? (
        <div>
          <h2>{course.title}</h2>
          <p>Course ID: {course.id}</p>
          <p>
            Teacher ID:{" "}
            {course.teachers.length > 0 ? course.teachers[0].id : "N/A"}
          </p>
          <p>List of Students:</p>
          <ul>
            {course.students.map((student) => (
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
          <AssignForm courseId={course.id} onAssign={handleAssignmentSuccess} />
        </div>
      ) : (
        <div>Course not found</div>
      )}
    </div>
  );
}