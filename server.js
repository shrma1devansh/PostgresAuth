import express from "express";
import dotenv from "dotenv";
import "./config/db.js";
import cors from "cors";
import session from "express-session";
import cca from "./config/msalConfig.js";

import microsoftRoutes from "./routes/microsoftRoutes.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);



app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/auth/microsoft", microsoftRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});