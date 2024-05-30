// pages/api/students/count.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const studentCount = await prisma.student.count();
      res.status(200).json({ count: studentCount });
    } catch (error) {
      console.error("Error fetching student count:", error);
      res.status(500).json({ error: "Failed to fetch student count" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
