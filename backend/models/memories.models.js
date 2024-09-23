import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
    location: {
        type: String, 
        required: true 
    },month: {
        type: String, 
        required: true 
    },image: { 
        type: String, 
        required: true 
    },

}, {
    timestamps: true, //makes CreatedAt and UpdatedAt fields available to work with
});


const memory = mongoose.model('Memory' , memorySchema);

export default memory; //exporting the model to be used in the controller