import { useState, useEffect } from "react";
import CourseList from "./../../components/CourseList";
import CourseForm from "./../../components/CourseForm";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      } else {
        console.error("Failed to fetch courses");
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const handleCreateCourse = (course) => {
    setCourses([...courses, course]);
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <div className="mb-4">
        <CourseForm onCreateCourse={handleCreateCourse} />
      </div>
      <div>
        <CourseList courses={courses} />
      </div>
      <div className="mt-4">
        <a href="/dashboard" className="text-indigo-600 hover:underline">
          Back
        </a>
      </div>
    </div>
  );
}
