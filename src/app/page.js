import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl text-center font-bold mb-8">
          Welcome to Student Course Managment System
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/students"
            className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">Students</h2>
            <p className="text-lg">Click to view students</p>
          </a>

          <a
            href="/teachers"
            className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">Teachers</h2>
            <p className="text-lg">Click to view teachers</p>
          </a>

          <a
            href="/courses"
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">Courses</h2>
            <p className="text-lg">Click to view courses</p>
          </a>
        </div>
      </div>
    </main>
  );
}
