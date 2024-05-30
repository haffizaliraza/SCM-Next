import { useState } from "react";
import "tailwindcss/tailwind.css";

export default function CourseForm({ onCreateCourse }) {
  const [title, setName] = useState("");
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    // Your fetching logic to get courses from the API
    // For example:
    const response = await fetch("/api/courses");
    const data = await response.json();
    setCourses(data);
    onCreateCourse(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      setName("");
      fetchCourses();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setName(e.target.value)}
        placeholder="Course Name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <button
        type="submit"
        className={`w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          !title && "opacity-50 cursor-not-allowed"
        }`}
      >
        Add Course
      </button>
    </form>
  );
}
