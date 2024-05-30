import { useState } from "react";
import "tailwindcss/tailwind.css";

export default function CourseForm({ onCreateCourse }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      if (res.ok) {
        const data = await res.json();
        onCreateCourse(data);
        setTitle("");
      } else {
        console.error("Failed to create course");
      }
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Course Title"
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
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
