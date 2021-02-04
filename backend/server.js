import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

//routes
import taskRoutes from "./routes/task.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

// app
const app = express();

//db
//https://mongoosejs.com/docs/
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join("public")));
app.use(cookieParser());

// cors
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
//app.use(express.static(__dirname + "/public"));
//routes middleware
app.use("/api", taskRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);

//port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
