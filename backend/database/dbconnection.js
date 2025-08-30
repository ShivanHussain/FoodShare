import mongoose from "mongoose";
import { debugDatabase } from "../utils/debugLogger.js";

// @desc 
export const dbConnection = () => {
  mongoose
    .connect(process.env.ATLAS_URL, {
      dbName: "foodshare",
    })
    .then(() => {
      debugDatabase("Connected to database!");
    })
    .catch((err) => {
      debugDatabase("Some error occured while connecting to database:", err);
    });
};
