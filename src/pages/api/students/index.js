import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.method === "GET") {
      try {
        const students = await prisma.student.findMany();
        res.status(200).json(students);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Could not fetch students" });
      }
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } else if (req.method === "POST") {
    const { name } = req.body;
    try {
      const student = await prisma.student.create({
        data: {
          name,
        },
      });
      res.status(201).json(student);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Could not create student" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
