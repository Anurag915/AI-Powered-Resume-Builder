import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import resumeRouter from "./routes/resume.routes.js";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:5173", // For local development
    "https://ai-powered-resume-builder-six.vercel.app/" // Deployed frontend
  ];
const corsOptions = {
    origin:  allowedOrigins,
    credentials: true
};

app.use(cors(corsOptions));
app.get("/", (req, res) => {
    res.send("Welcome to AI Resume Builder API");
});
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);

app.post("/donate");

export default app;
