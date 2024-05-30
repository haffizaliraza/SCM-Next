import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Course Title"
      />
      <button type="submit">Add Course</button>
    </form>
  );
}
