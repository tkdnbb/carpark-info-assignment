import fs from 'fs';
import csv from 'csv-parser';
import { sql } from 'drizzle-orm'
import { Carpark } from "../routes/carparks";
import { DBtype } from './database';


export const batchJob = (db: DBtype) => {
  const insertCarpark = (carpark: Carpark) => {
    const { car_park_no, address, x_coord, y_coord, car_park_type, type_of_parking_system, short_term_parking, free_parking, night_parking, car_park_decks, gantry_height, car_park_basement } = carpark;
    db.run(sql`
      INSERT INTO carparks (car_park_no, address, x_coord, y_coord, car_park_type, type_of_parking_system, short_term_parking, free_parking, night_parking, car_park_decks, gantry_height, car_park_basement)
      VALUES (${car_park_no}, ${address}, ${x_coord}, ${y_coord}, ${car_park_type}, ${type_of_parking_system}, ${short_term_parking}, ${free_parking}, ${night_parking}, ${car_park_decks}, ${gantry_height}, ${car_park_basement})
    `);
  }
  fs.createReadStream('hdb-carpark-information-20220824010400.csv')
    .pipe(csv())
    .on('data', (data: Carpark) => {
      const carpark: Carpark = {
        car_park_no: data.car_park_no,
        address: data.address,
        x_coord: Number(data.x_coord),
        y_coord: Number(data.y_coord),
        car_park_type: data.car_park_type,
        type_of_parking_system: data.type_of_parking_system,
        short_term_parking: data.short_term_parking,
        free_parking: data.free_parking,
        night_parking: data.night_parking,
        car_park_decks: Number(data.car_park_decks),
        gantry_height: Number(data.gantry_height),
        car_park_basement: data.car_park_basement
      }
      try {
        insertCarpark(carpark);
      } catch (err: any) {
        //console.log(err)
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    }
  );
}
