import { sql } from 'drizzle-orm'
import { Request, Response } from "express";
import db from "../../db/database"
import { Carpark } from '../../routes/carparks';

const addFavorite = async (req: Request, res: Response) => {
  const { user_id, car_park_no }: Pick<Carpark, 'car_park_no'> & {user_id: string} = req.body;
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

  const carparkExitsQuery = sql`
    SELECT EXISTS (
      SELECT 1
      FROM carparks
      WHERE car_park_no = ${car_park_no}
    );
  `
  const isLegalCarparkNo = db.values(carparkExitsQuery)[0][0] as number;

  if (!isLegalCarparkNo) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "Invalid car park no" });
  }

  const query = sql`
    INSERT INTO favorites (user_id, car_park_no)
    VALUES (${user_id}, ${car_park_no})
  `;
  const result = db.run(query)
  console.log(result)
  res.json({ message: 'Added to favorites' });
};

export default addFavorite;
