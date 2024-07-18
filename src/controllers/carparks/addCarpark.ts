import { sql } from 'drizzle-orm'
import { Request, Response } from "express";
import db from "../../db/database"
import { Carpark } from '../../routes/carparks';


const addCarpark = async (req: Request, res: Response) => {
  const {
    car_park_no, address, x_coord, y_coord, car_park_type, type_of_parking_system, short_term_parking, free_parking, night_parking, car_park_decks, gantry_height, car_park_basement }: Carpark = req.body;

  if (!car_park_no) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "Car park no is required" });
  }
  try {
    const query = sql`
      INSERT INTO carparks (car_park_no, address, x_coord, y_coord, car_park_type, type_of_parking_system, short_term_parking, free_parking, night_parking, car_park_decks, gantry_height, car_park_basement)
      VALUES (${car_park_no}, ${address}, ${x_coord}, ${y_coord}, ${car_park_type}, ${type_of_parking_system}, ${short_term_parking}, ${free_parking}, ${night_parking}, ${car_park_decks}, ${gantry_height}, ${car_park_basement})
    `;
    const result = db.run(query)
    console.log(result)
  } catch (err) {
    console.log(err)
    return res
      .status(400)
      .json({ success: false, data: null, message: "Error adding carpark" });
  }
  res.json({ message: 'Added to carparks' });
};

export default addCarpark;
