import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { name } = req.body;
    const teacher = await prisma.teacher.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.status(200).json(teacher);
  } else if (req.method === "DELETE") {
    await prisma.teacher.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
