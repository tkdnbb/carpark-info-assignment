import { Router } from "express";
import swaggerUi from 'swagger-ui-express';

import getFavorites from "../controllers/carparks/getFavorites";
import addFavorite from "../controllers/carparks/addFavorite";
import removeFavorite from "../controllers/carparks/removeFavorite";
import getCarparks from "../controllers/carparks/getCarparks";

import swaggerDocument from "../swagger.json"

export type Carpark = {
  car_park_no: string;
  address: string;
  x_coord: number;
  y_coord: number;
  car_park_type: string;
  type_of_parking_system: "COUPON PARKING" | "ELECTRONIC PARKING";
  short_term_parking: string;
  free_parking: string;
  night_parking: 'YES'|'NO';
  car_park_decks: number;
  gantry_height: number;
  car_park_basement: 'Y' | 'N';
};

const router = Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
router.get("/", getCarparks);
router.post("/add_favorite", addFavorite);
router.post("/remove_favorite", removeFavorite);
router.post("/favorites", getFavorites);

export default router;
