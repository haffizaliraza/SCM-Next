import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

export default function EditCourseForm({ course, onSave, onCancel }) {
  const [title, setName] = useState("");

  useEffect(() => {
    if (course) {
      setName(course.title);
    }
  }, [course]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/courses/${course.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setName(e.target.value)}
        placeholder="Course Name"
        className="border p-2 mb-4 w-full"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 mr-2">
        Save
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="bg-red-500 text-white px-4 py-2"
      >
        Cancel
      </button>
    </form>
  );
}
