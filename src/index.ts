import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db";

// Connect to MongoDB
connectDB();

// Telegram bot
import "./bot";
