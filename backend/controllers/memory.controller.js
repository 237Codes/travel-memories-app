import Memory from '../models/memories.models.js';
import mongoose from 'mongoose';

export const getMemory = async (req, res) => {
    try {
        const memories = await Memory.find({});
        res.status(200).json ({success: true, data: memories});
    } catch (error) {
        console.log("Error in fetching memories:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createMemory = async (req, res) => {
    const memory = req.body; //user will send data
    if (!memory.location || !memory.month || !memory.image) {
        return res.status(400).json({ succes:false , message: "Please provide all fields "});
    }
    const newMemory = new Memory(memory);
 
    try {
        await newMemory.save();
        res.status(201).json({ success: true, data: newMemory });
    }catch (error) {
        console.error("Error in creating memory:", error.message);
          res.status(500).json({ success: false, message: "Server Error" });
    }
 }

 export const updateMemory = async (req, res) => {
    const {id} = req.params;
    const memory = req.body;
    if (!memory.location || !memory.month || !memory.image) {
        res.status(400).json({ succes:false , message: "Invalid Product ID "});
    }
    try {
        const updatedMemory = await Memory.findByIdAndUpdate(id, memory, {new: true});
        res.status(200).json({ success: true, data: updatedMemory });
    } catch (error) {
        console.error("Error in updating memory:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const deleteMemory = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false, message:"Invalid Memory ID"});
    }
    //console.log("id:", id);  //print out the memory id
    try {
        await Memory.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Memory deleted successfully"});
    } catch (error) {
        console.log("Error in deleting memory:", error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
}