import { useState } from "react";

export default function AssignForm({ courseId, onAssign }) {
  const [teacherId, setTeacherId] = useState("");
  const [studentIds, setStudentIds] = useState("");

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/courses/${courseId}/assign`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teacherId, studentIds: studentIds.split(",") }),
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
    <form onSubmit={handleAssign}>
      <label>
        Teacher ID:
        <input
          type="text"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          placeholder="Teacher ID"
        />
      </label>
      <label>
        Student IDs (comma-separated):
        <input
          type="text"
          value={studentIds}
          onChange={(e) => setStudentIds(e.target.value)}
          placeholder="Student IDs"
        />
      </label>
      <button type="submit">Assign</button>
    </form>
  );
}
