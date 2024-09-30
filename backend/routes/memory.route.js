import express from "express";

import { getMemory } from "../controllers/memory.controller.js";
import { createMemory } from "../controllers/memory.controller.js";
import { updateMemory } from "../controllers/memory.controller.js";
import { deleteMemory } from "../controllers/memory.controller.js";

const router  = express.Router();

router.get("", getMemory);
router.post("", createMemory);
router.put("/:id", updateMemory);
console.log(process.env.MONGO_URI); //Connecting the database
router.delete("/:id", deleteMemory )

export default router;