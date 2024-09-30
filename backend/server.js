import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import memoryRoutes from "./routes/memory.route.js";

dotenv.config();

const app = express();

app.use(express.json()); //allows us to parse or accept json data in the reuest.body

app.use("/api/memories", memoryRoutes); // This will call the functions inside the memory.routes.js file

app.listen(8000, () => { 
    connectDB();// as soon as we listen to the app, let us connect to the database
    console.log("Server started on  http://localhost:8000");
});


//