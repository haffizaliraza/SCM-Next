// pages/api/courses/[id].js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const courseId = req.query.id;

  if (req.method === "GET") {
    try {
      const course = await prisma.course.findUnique({
        where: {
          id: parseInt(courseId),
        },
        include: {
          // Include any related entities you want to fetch (e.g., teachers, students)
          // Modify this according to your data model
          teachers: true,
          students: true,
        },
      });

      if (!course) {
        res.status(404).json({ error: "Course not found" });
      } else {
        res.status(200).json(course);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
      res.status(500).json({ error: "Failed to fetch course details" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
