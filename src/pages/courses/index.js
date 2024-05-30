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
    <div>
      <h1>Courses</h1>
      <CourseForm onCreateCourse={handleCreateCourse} />
      <CourseList courses={courses} />
    </div>
  );
}
