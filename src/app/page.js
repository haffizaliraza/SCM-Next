import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div class="container mx-auto mt-10">
        <h1 class="text-3xl text-center font-bold mb-8">Dashboard</h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/students"
            class="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center transition duration-300"
          >
            <h2 class="text-xl font-semibold mb-2">Students</h2>
            <p class="text-lg">Click to view students</p>
          </a>

          <a
            href="/teachers"
            class="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center transition duration-300"
          >
            <h2 class="text-xl font-semibold mb-2">Teachers</h2>
            <p class="text-lg">Click to view teachers</p>
          </a>

          <a
            href="/courses"
            class="bg-yellow-500 hover:bg-yellow-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center transition duration-300"
          >
            <h2 class="text-xl font-semibold mb-2">Courses</h2>
            <p class="text-lg">Click to view courses</p>
          </a>
        </div>
      </div>
    </main>
  );
}
