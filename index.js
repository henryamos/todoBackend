import express from "express";
import mongoose from "mongoose";
import todoRoutes from "./routes/todoRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";
import { configDotenv } from "dotenv";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
 app.use('/api/todos', todoRoutes);
configDotenv()
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(PORT, () => {    
  console.log(`Server is running on port ${PORT}`);});
