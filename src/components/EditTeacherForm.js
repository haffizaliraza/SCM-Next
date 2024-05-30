import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

export default function EditTeacherForm({ teacher, onSave, onCancel }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (teacher) {
      setName(teacher.name);
    }
  }, [teacher]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/teachers/${teacher.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Teacher Name"
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
