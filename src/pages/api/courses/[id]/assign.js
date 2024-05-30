export default async function handler(req, res) {
  const courseId = req.query.id;

  if (req.method === "PUT") {
    const { teacherId, studentIds } = req.body;

    try {
      const course = await prisma.course.update({
        where: { id: parseInt(courseId) },
        data: {
          teachers: {
            connect: { id: parseInt(teacherId) }, // Parse teacherId to integer
          },
          students: {
            connect: studentIds.map((id) => ({ id: parseInt(id) })), // Parse studentIds to integers
          },
        },
        include: {
          teachers: true,
          students: true,
        },
      });
      res.status(200).json(course);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Could not assign teacher and students to the course" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
