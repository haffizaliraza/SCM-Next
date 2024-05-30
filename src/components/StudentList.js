import "tailwindcss/tailwind.css";
export default function StudentList({ students }) {
  return (
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
        {students.map((student) => (
          <tr key={student.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {student.name}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
              <button
                className="text-indigo-600 hover:text-indigo-900"
                onClick={() => handleUpdate(student)}
              >
                Update
              </button>
              <button
                className="text-red-600 hover:text-red-900"
                onClick={() => handleDelete(student)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
