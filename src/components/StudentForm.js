import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Student Name"
      />
      <button type="submit">Add Student</button>
    </form>
  );
}
