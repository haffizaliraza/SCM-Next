import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const courses = await prisma.course.findMany();
      res.status(200).json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Could not fetch courses" });
    }
  } else if (req.method === "POST") {
    const { title } = req.body;
    try {
      const course = await prisma.course.create({
        data: {
          title,
        },
      });
      res.status(201).json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Could not create course" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
