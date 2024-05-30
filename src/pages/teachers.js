// Import necessary hooks and components
import { useState, useEffect } from "react";
import TeacherForm from "../components/TeacherForm";
import TeacherList from "../components/TeacherList";
import EditTeacherForm from "../components/EditTeacherForm";
import "tailwindcss/tailwind.css";

export default function Teachers() {
  // Define state variables
  const [teachers, setTeachers] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [deletingTeacher, setDeletingTeacher] = useState(null);

  // Function to fetch teachers from the API
  const fetchTeachers = async () => {
    const res = await fetch("/api/teachers");
    const data = await res.json();
    setTeachers(data);
  };

  // Fetch teachers when the component mounts
  useEffect(() => {
    fetchTeachers();
  }, []);

  // Function to handle editing a teacher
  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
  };

  // Function to handle deleting a teacher
  const handleDelete = async (teacher) => {
    // Show a confirmation dialog before deleting
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${teacher.name}?`
    );

    // Proceed with deletion only if the user confirms
    if (confirmDelete) {
      try {
        // Send a DELETE request to the API route for deleting a teacher
        const res = await fetch(`/api/teachers/${teacher.id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          // If deletion is successful, fetch updated list of teachers
          fetchTeachers();
        } else {
          console.error("Failed to delete teacher");
        }
      } catch (error) {
        console.error("Error deleting teacher:", error);
      }
    }
  };

  // Function to handle saving changes when editing a teacher
  const handleSave = () => {
    setEditingTeacher(null);
    fetchTeachers();
  };

  // Function to handle cancelling the edit operation
  const handleCancel = () => {
    setEditingTeacher(null);
  };

  // JSX for rendering the component
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Manage Teachers
        </h1>
        {editingTeacher ? (
          <EditTeacherForm
            teacher={editingTeacher}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <TeacherForm onCreateTeacher={handleSave} />
        )}
        <TeacherList
          teachers={teachers}
          onEdit={handleEdit}
          onDelete={handleDelete} // Pass the handleDelete function to the TeacherList component
          fetchTeachers={fetchTeachers}
        />
        <div className="mt-4">
          <a href="/dashboard" className="text-indigo-600 hover:underline">
            Back
          </a>
        </div>
      </div>
    </div>
  );
}
