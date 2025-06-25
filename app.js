import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.route.js'; 
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import { app,server } from './lib/socket.js';


dotenv.config();
const PORT = process.env.PORT;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use(cors(
  {
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true // Allow credentials (cookies, authorization headers, etc.) to be sent
  }
))

// for the authentication routes
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

server.listen(PORT, () => {
  console.log(`Server is running on port http://Localhost:${PORT}`);
  connectDB();
})