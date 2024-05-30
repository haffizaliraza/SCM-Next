// pages/api/teachers/count.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const teacherCount = await prisma.teacher.count();
      res.status(200).json({ count: teacherCount });
    } catch (error) {
      console.error("Error fetching teacher count:", error);
      res.status(500).json({ error: "Failed to fetch teacher count" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
