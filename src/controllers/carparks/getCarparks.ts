import { sql } from 'drizzle-orm'
import { Request, Response } from "express";
import db from "../../db/database"
import { Carpark } from '../../routes/carparks';

type FilterKeys = 'free_parking'|'night_parking'|'gantry_height'
type ReqFilters = {[k in FilterKeys]: Carpark[k] extends string ? Carpark[k] : string}
type Req = Request<{}, {}, {}, ReqFilters>
type Filters = Pick<Carpark, FilterKeys> & {limit?: number}

const getCarparks = async (req: Req, res: Response) => {
  const query: Filters = {...req.query, gantry_height: Number(req.query.gantry_height)};
  const { free_parking, night_parking, gantry_height, limit } = query;
  const rawQuery = sql`SELECT * FROM carparks WHERE 1 = 1`;

  if (free_parking === "NO") {
      rawQuery.append(sql` AND free_parking = 'NO'`);
  }
  if (night_parking === "NO") {
      rawQuery.append(sql` AND night_parking = 'NO'`);
  }
  if (gantry_height) {
      rawQuery.append(sql` AND gantry_height >= ${gantry_height}`);
  }
  if (limit) {
      rawQuery.append(sql` LIMIT ${limit}`);
  }

  try {
    const result = db.all(rawQuery)
    res.json(result);
  } catch (err: any) {
    console.log(err)
    res.json(err);
  }
};

export default getCarparks;
