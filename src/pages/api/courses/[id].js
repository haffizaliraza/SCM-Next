// pages/api/courses/[id].js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { title } = req.body;
    const course = await prisma.course.update({
      where: { id: parseInt(id) },
      data: { title },
    });
    res.status(200).json(course);
  } else if (req.method === "DELETE") {
    await prisma.course.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } else if (req.method === "GET") {
    try {
      const course = await prisma.course.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
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
