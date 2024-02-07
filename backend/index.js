import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/connectDb.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import cors from "cors"

//setup
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
connectDb(process.env.MONGO_URL, process.env.DB_NAME);

//middlwares
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_BASE_URL }));

//route middlewares
app.use("/api/v1/feedback", feedbackRoutes);
app.use("/api/v1/comment", commentRoutes);

//starting server
app.listen(port, () => {
  console.log("listening on port:" + port);
});
