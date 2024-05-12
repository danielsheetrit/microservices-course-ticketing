import { Express } from "express";
import mongoose, { Schema, Document, Model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = async (app: Express) => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY is not exist!");
    }

    const connectionUri =
      process.env.MONGO_URI || "mongodb://auth-mongo-srv:27017/auth";

    await mongoose.connect(connectionUri);
    console.log("Connected to MongoDB");

    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  } catch (err) {
    console.error(`Failed to connect MongoDB: ${err}`);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

export { mongoose, Schema, Document, Model, connect };
