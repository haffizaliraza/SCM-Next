import "tailwindcss/tailwind.css";
import Link from "next/link";

export default function CourseList({ courses }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Title
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
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex space-x-2">
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
  );
}
