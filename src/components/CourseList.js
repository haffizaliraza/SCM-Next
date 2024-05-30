import { useEffect } from "react";
import "tailwindcss/tailwind.css";
import Link from "next/link";

export default function CourseList({
  courses,
  onEdit,
  onDelete,
  fetchCourses,
}) {
  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEdit = (course) => {
    onEdit(course);
  };

  const handleDelete = (course) => {
    // Implement the logic to delete the course
    // Call the onDelete function with the course as an argument
    onDelete(course);
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Courses</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course) => (
            <tr key={course.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {course.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDelete(course)}
                >
                  Delete
                </button>
                <Link href={`/courses/${course.id}`}>
                  <button className="text-blue-600 hover:text-blue-900">
                    Visit
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
