import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const courseId = req.query.id;

  if (req.method === "PUT") {
    const { teacherId, studentIds } = req.body;

    // Validate if teacherId and studentIds are provided
    if (!teacherId || !studentIds || studentIds.length === 0) {
      return res
        .status(400)
        .json({ error: "Both teacherId and studentIds are required" });
    }

    try {
      const course = await prisma.course.update({
        where: { id: parseInt(courseId) },
        data: {
          teachers: {
            connect: { id: parseInt(teacherId) }, // Ensure teacherId is converted to integer
          },
          students: {
            connect: studentIds.map((id) => ({ id: parseInt(id) })), // Convert studentIds to integers
          },
        },
        include: {
          teachers: true,
          students: true,
        },
      });
      res.status(200).json(course);
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(500).json({
        error: "Could not assign teacher and students to the course",
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
