import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import config from "./src/config.js";
import router from "./src/mail/mail.routes.js";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static(path.join(process.cwd(), "public")));
app.get("/", (req, res) => {
    res.send("Backend running successfully!");
});
app.use("/api", router);
async function connectDB() {
    await mongoose.connect(config.dbUrl);
    console.log("MongoDB connected");
}

async function startServer() {
    await connectDB();
    app.listen(config.serverPort, () => {
        console.log(`Server running on port ${config.serverPort}`);
    });
}

startServer();
