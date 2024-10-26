import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

//import cors module
import cors from "cors";

import memoryRoutes from "./routes/memory.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000; 

app.use(express.json()); //allows us to parse or accept json data in the reuest.body
app.use(cors({ origin: 'http://localhost:5173' }));
app.use("/api/memories", memoryRoutes); // This will call the functions inside the memory.routes.js file

app.listen(PORT, () => { 
    connectDB();// as soon as we listen to the app, let us connect to the database
    console.log("Server started on  http://localhost:" + PORT);
});


//