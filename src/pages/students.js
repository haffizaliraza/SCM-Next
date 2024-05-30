import { useState, useEffect } from "react";
import StudentList from "../components/StudentList";
import StudentForm from "../components/StudentForm";
import "tailwindcss/tailwind.css";

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/students");
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      } else {
        console.error("Failed to fetch students");
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  const handleCreateStudent = (student) => {
    setStudents([...students, student]);
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <div className="mb-4">
        <StudentForm onCreateStudent={handleCreateStudent} />
      </div>
      <div>
        <StudentList students={students} />
      </div>
      <div className="mt-4">
        <a href="/dashboard" className="text-indigo-600 hover:underline">
          Back
        </a>
      </div>
    </div>
  );
}
