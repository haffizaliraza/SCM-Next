import { useEffect } from "react";

export default function TeacherList({ teachers, onEdit, fetchTeachers }) {
  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleEdit = (teacher) => {
    onEdit(teacher);
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Teachers</h2>
      <ul>
        {teachers.map((teacher) => (
          <li
            key={teacher.id}
            className="mb-2 flex justify-between items-center"
          >
            {teacher.name}
            <button
              onClick={() => handleEdit(teacher)}
              className="bg-yellow-500 text-white px-2 py-1 ml-4"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
