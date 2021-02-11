import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//routes
import taskRoutes from "./routes/task.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import userTaskRoutes from "./routes/userTask.js";
import adminTaskRoutes from "./routes/adminTask.js";

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
app.use(cookieParser());

// cors
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//routes middleware
app.use("/api", taskRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", userTaskRoutes);
app.use("/api", adminTaskRoutes);

//port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
