import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Memory from "./models/memories.models.js";

dotenv.config();

const app = express();

app.use(express.json()); //allows us to parse or accept json data in the reuest.body

//create  a memories route to listen for the GET method
// app.get("/memories", (req, res) => {
//     res.send('Server is ready');
// });

//create a memory route to listen for the POST method
app.post("/api/memories", async (req, res) => {
   const memory = req.body; //user will send data
   if (!memory.location || !memory.month || !memory.image) {
       res.status(400).json({ succes:false , message: "Please provide all fields "});
   }
   const newMemory = new Memory(memory);

   try {
       await newMemory.save();
       res.status(201).json({ success: true, data: newMemory });
   }catch (error) {
       console.error("Error in creating memory:", error.message);
         res.status(500).json({ success: false, message: "Server error" });
   }
});

// postman desktop application

//Connecting the database
console.log(process.env.MONGO_URI);


app.listen(8000, () => { 
    connectDB();// as soon as we listen to the app, let us connect to the database
    console.log("Server started on  http://localhost:8000");
});


//