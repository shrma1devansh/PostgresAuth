import express from "express";
import dotenv from "dotenv";
import "./config/db.js";
import cors from "cors";
// import session from "express-session";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import passport from "passport";
import samlRoutes from "./routes/samlRoutes.js"
import session from "express-session";
import "./config/passport.js";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
// creates authentication middleware for passport so saml can relate to redirection flow and callback flow


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use('/auth/saml',samlRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});