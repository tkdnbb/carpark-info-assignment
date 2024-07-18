import { sql } from 'drizzle-orm'
import { Request, Response } from "express";
import db from "../../db/database"


const getFavorites = async (req: Request, res: Response) => {
  const { user_id }: { user_id: string } = req.body;

  if (!user_id) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "User ID is required" });
  }

  const query = sql`
    SELECT c.*
    FROM carparks c
    JOIN favorites f ON c.car_park_no = f.car_park_no
    WHERE f.user_id = ${user_id}
  `;
  const result = db.all(query)
  res.json(result);
};

export default getFavorites;
