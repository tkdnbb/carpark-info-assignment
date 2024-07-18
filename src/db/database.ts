import sqlite3 from 'better-sqlite3';
import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { batchJob } from './batch';

const sqlite = new sqlite3('sqlite.db');
const db = drizzle(sqlite);
export type DBtype = typeof db;

const carparksSchema = sql`
    CREATE TABLE IF NOT EXISTS carparks (
        car_park_no TEXT PRIMARY KEY,
        address TEXT,
        x_coord REAL,
        y_coord REAL,
        car_park_type TEXT NOT NULL,
        type_of_parking_system TEXT CHECK( type_of_parking_system IN ('COUPON PARKING', 'ELECTRONIC PARKING') ) NOT NULL,
        short_term_parking TEXT,
        free_parking TEXT,
        night_parking TEXT CHECK( night_parking IN ('YES', 'NO') ) NOT NULL DEFAULT 'NO',
        car_park_decks INTEGER,
        gantry_height REAL,
        car_park_basement TEXT CHECK( car_park_basement IN ('Y', 'N') ) NOT NULL DEFAULT 'N'
    );
`;

const favoritesSchema = sql`
    CREATE TABLE IF NOT EXISTS favorites (
        user_id TEXT NOT NULL,
        car_park_no TEXT NOT NULL,
        PRIMARY KEY (user_id, car_park_no),
        FOREIGN KEY (car_park_no) REFERENCES carparks(car_park_no)
    );
`;

db.run(carparksSchema)
db.run(favoritesSchema)
batchJob(db)

export default db
