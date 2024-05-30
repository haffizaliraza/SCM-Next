import { useState, useEffect } from "react";
import TeacherForm from "../components/TeacherForm";
import TeacherList from "../components/TeacherList";
import EditTeacherForm from "../components/EditTeacherForm";
import "tailwindcss/tailwind.css";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const fetchTeachers = async () => {
    const res = await fetch("/api/teachers");
    const data = await res.json();
    setTeachers(data);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
  };

  const handleSave = () => {
    setEditingTeacher(null);
    fetchTeachers();
  };

  const handleCancel = () => {
    setEditingTeacher(null);
  };

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
          <TeacherForm />
        )}
        <TeacherList
          teachers={teachers}
          onEdit={handleEdit}
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
