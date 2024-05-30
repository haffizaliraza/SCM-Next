// pages/dashboard.js

import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

export default function Dashboard() {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);

  useEffect(() => {
    // Fetch counts for students, teachers, and courses from the backend API
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const studentResponse = await fetch("/api/students/count");
      const teacherResponse = await fetch("/api/teachers/count");
      const courseResponse = await fetch("/api/courses/count");

      if (studentResponse.ok && teacherResponse.ok && courseResponse.ok) {
        const studentData = await studentResponse.json();
        const teacherData = await teacherResponse.json();
        const courseData = await courseResponse.json();

        setStudentCount(studentData.count);
        setTeacherCount(teacherData.count);
        setCourseCount(courseData.count);
      } else {
        console.error("Failed to fetch counts");
      }
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  return (
    <div>
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl text-center font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/students"
            className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">Students</h2>
            <p>Count: {studentCount}</p>
            <p className="text-lg">Click to view students</p>
          </a>

          <a
            href="/teachers"
            className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">Teachers</h2>
            <p>Count: {teacherCount}</p>
            <p className="text-lg">Click to view teachers</p>
          </a>

          <a
            href="/courses"
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">Courses</h2>
            <p>Count: {courseCount}</p>
            <p className="text-lg">Click to view courses</p>
          </a>
        </div>
      </div>
    </div>
  );
}
