import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import todoRoutes from "./routes/todo.route.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/todos", todoRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

    app.get("/*splat", (req, res) => {
        res.resolve(__dirname, "..", "frontend", "dist", "index.html");
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});