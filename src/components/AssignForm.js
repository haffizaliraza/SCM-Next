import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

export default function AssignForm({ courseId, onAssign }) {
  const [teacherId, setTeacherId] = useState("");
  const [studentIds, setStudentIds] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [errorTeachers, setErrorTeachers] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("/api/teachers"); // Replace '/api/teachers' with your actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch teachers");
        }
        const data = await response.json();
        setTeachers(data);
        setLoadingTeachers(false);
      } catch (error) {
        setErrorTeachers(error.message);
        setLoadingTeachers(false);
      }
    };

    fetchTeachers();
  }, []);

  // Function to fetch students from the database
  const fetchStudentsFromDB = async () => {
    try {
      const response = await fetch("/api/students");
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      setStudents(data); // Update the state with the fetched students
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Fetch students when the component mounts
  useEffect(() => {
    fetchStudentsFromDB();
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!teacherId || selectedStudents.length === 0) {
      console.error("Please select both a teacher and at least one student");
      return;
    }
    try {
      const res = await fetch(`/api/courses/${courseId}/assign`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacherId,
          studentIds: selectedStudents,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        onAssign(data);
      } else {
        console.error("Failed to assign teacher and students to the course");
      }
    } catch (error) {
      console.error(
        "Failed to assign teacher and students to the course:",
        error
      );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Assign Teacher, Student to Course
      </h2>
      <form onSubmit={handleAssign}>
        <label>
          Teacher:
          <select
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Students:
          <select
            multiple
            className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            value={selectedStudents}
            onChange={(e) =>
              setSelectedStudents(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          disabled={!teacherId || selectedStudents.length === 0}
          className={`w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            (!teacherId || selectedStudents.length === 0) &&
            "opacity-50 cursor-not-allowed"
          }`}
        >
          Assign
        </button>
      </form>
    </div>
  );
}
