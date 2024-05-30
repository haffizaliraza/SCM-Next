import { useState } from "react";
import "tailwindcss/tailwind.css";

export default function StudentForm({ onCreateStudent }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        const data = await res.json();
        onCreateStudent(data);
        setName("");
      } else {
        console.error("Failed to create student");
      }
    } catch (error) {
      console.error("Failed to create student:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Student Name"
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
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
