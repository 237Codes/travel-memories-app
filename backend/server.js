import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// for config for deployment
import path from "path";

//import cors module
import cors from "cors";

import memoryRoutes from "./routes/memory.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000; 
const __dirname = path.resolve()

app.use(express.json()); //allows us to parse or accept json data in the reuest.body
app.use(cors({ origin: 'http://localhost:5173' }));
app.use("/api/memories", memoryRoutes); // This will call the functions inside the memory.routes.js file

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => { 
    connectDB();// as soon as we listen to the app, let us connect to the database
    console.log("Server started on  http://localhost:" + PORT);
});


//