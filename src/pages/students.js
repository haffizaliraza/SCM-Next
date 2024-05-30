// Import necessary hooks and components
import { useState, useEffect } from "react";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import EditStudentForm from "../components/EditStudentForm";
import "tailwindcss/tailwind.css";

export default function Students() {
  // Define state variables
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);

  // Function to fetch students from the API
  const fetchStudents = async () => {
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data);
  };

  // Fetch students when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to handle editing a student
  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  // Function to handle deleting a student
  const handleDelete = async (student) => {
    // Show a confirmation dialog before deleting
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    // Proceed with deletion only if the user confirms
    if (confirmDelete) {
      try {
        // Send a DELETE request to the API route for deleting a student
        const res = await fetch(`/api/students/${student.id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          // If deletion is successful, fetch updated list of students
          fetchStudents();
        } else {
          console.error("Failed to delete student");
        }
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  // Function to handle saving changes when editing a student
  const handleSave = () => {
    setEditingStudent(null);
    fetchStudents();
  };

  // Function to handle cancelling the edit operation
  const handleCancel = () => {
    setEditingStudent(null);
  };

  // JSX for rendering the component
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Manage Students
        </h1>
        {editingStudent ? (
          <EditStudentForm
            student={editingStudent}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <StudentForm onCreateStudent={handleSave} />
        )}
        <StudentList
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete} // Pass the handleDelete function to the StudentList component
          fetchStudents={fetchStudents}
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
