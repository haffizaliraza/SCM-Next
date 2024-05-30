// pages/api/courses/count.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const courseCount = await prisma.course.count();
      res.status(200).json({ count: courseCount });
    } catch (error) {
      console.error("Error fetching course count:", error);
      res.status(500).json({ error: "Failed to fetch course count" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
