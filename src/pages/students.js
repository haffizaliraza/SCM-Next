import { useState, useEffect } from "react";
import StudentList from "../components/StudentList";
import StudentForm from "../components/StudentForm";

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
    <div>
      <h1>Students</h1>
      <StudentForm onCreateStudent={handleCreateStudent} />
      <StudentList students={students} />
    </div>
  );
}
