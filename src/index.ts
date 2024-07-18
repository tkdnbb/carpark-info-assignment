import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import carparkRoutes from "./routes/carparks";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:4000", "http://localhost:4001"],
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

app.use("/carparks", carparkRoutes);

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
