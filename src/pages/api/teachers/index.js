import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const teachers = await prisma.teacher.findMany();
        res.status(200).json(teachers);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch teachers" });
      }
      break;

    case "POST":
      try {
        const { name } = req.body;
        const newTeacher = await prisma.teacher.create({ data: { name } });
        res.status(201).json(newTeacher);
      } catch (error) {
        res.status(500).json({ error: "Failed to create teacher" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
