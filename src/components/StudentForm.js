import { useState } from "react";
import "tailwindcss/tailwind.css";

export default function StudentForm({ onCreateStudent }) {
  const [name, setName] = useState("");
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    // Your fetching logic to get students from the API
    // For example:
    const response = await fetch("/api/students");
    const data = await response.json();
    setStudents(data);
    onCreateStudent(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      setName("");
      fetchStudents();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Student Name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <button
        type="submit"
        className={`w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          !name && "opacity-50 cursor-not-allowed"
        }`}
      >
        Add Student
      </button>
    </form>
  );
}
