// Import necessary hooks and components
import { useState, useEffect } from "react";
import CourseForm from "./../../components/CourseForm";
import CourseList from "./../../components/CourseList";
import EditCourseForm from "./../../components/EditCourseForm";
import "tailwindcss/tailwind.css";

export default function Courses() {
  // Define state variables
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);

  // Function to fetch courses from the API
  const fetchCourses = async () => {
    const res = await fetch("/api/courses");
    const data = await res.json();
    setCourses(data);
  };

  // Fetch courses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  // Function to handle editing a course
  const handleEdit = (course) => {
    setEditingCourse(course);
  };

  // Function to handle deleting a course
  const handleDelete = async (course) => {
    // Show a confirmation dialog before deleting
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${course.title}?`
    );

    // Proceed with deletion only if the user confirms
    if (confirmDelete) {
      try {
        // Send a DELETE request to the API route for deleting a course
        const res = await fetch(`/api/courses/${course.id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          // If deletion is successful, fetch updated list of courses
          fetchCourses();
        } else {
          console.error("Failed to delete course");
        }
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  // Function to handle saving changes when editing a course
  const handleSave = () => {
    setEditingCourse(null);
    fetchCourses();
  };

  // Function to handle cancelling the edit operation
  const handleCancel = () => {
    setEditingCourse(null);
  };

  // JSX for rendering the component
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Manage Courses
        </h1>
        {editingCourse ? (
          <EditCourseForm
            course={editingCourse}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <CourseForm onCreateCourse={handleSave} />
        )}
        <CourseList
          courses={courses}
          onEdit={handleEdit}
          onDelete={handleDelete} // Pass the handleDelete function to the CourseList component
          fetchCourses={fetchCourses}
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
