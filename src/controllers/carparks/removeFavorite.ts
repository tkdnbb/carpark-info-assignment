import { Request, Response } from "express";
import { sql } from 'drizzle-orm'

const db = require('../../db/database');

const removeFavorite = async (req: Request, res: Response) => {
  const { user_id, car_park_no }: { user_id: string; car_park_no: string } = req.body;

  if (!user_id) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "User ID is required" });
  }

  if (!car_park_no) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "Car park no is required" });
  }
  
  const query = sql`
    DELETE FROM favorites WHERE user_id = ${user_id} AND car_park_no = ${car_park_no}
  `;
  db.run(query, (err: any) => {
    if (err) {
      return res.status(500).json({ message: 'Error removing favorite', error: err.message });
    }
    res.json({ message: 'Removed from favorites' });
  });
};

export default removeFavorite;
