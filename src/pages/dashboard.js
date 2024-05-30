// pages/dashboard.js

import { useState, useEffect } from "react";
import Link from "next/link";

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
      <h1>Dashboard</h1>
      <div>
        {/* <Link href="/students"> */}
        <a>
          <h2>Students</h2>
          <p>Count: {studentCount}</p>
        </a>
        {/* </Link> */}
      </div>
      <div>
        {/* <Link href="/teachers"> */}
        <a>
          <h2>Teachers</h2>
          <p>Count: {teacherCount}</p>
        </a>
        {/* </Link> */}
      </div>
      <div>
        {/* <Link href="/courses"> */}
        <a>
          <h2>Courses</h2>
          <p>Count: {courseCount}</p>
        </a>
        {/* </Link> */}
      </div>
    </div>
  );
}
