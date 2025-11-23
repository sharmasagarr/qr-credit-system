import mongoose from "mongoose";

const mrSchema = new mongoose.Schema({
    name: {type: String, required: true},
    id: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: {type: mongoose.Schema.Types.ObjectId, ref:'Admin', required: true},
    flm: {type: mongoose.Schema.Types.ObjectId, ref:'FLM', required: true},
    role:{type: String, default:'mr'},
    hq: {type: String, required: true},
    zone: {type: String, required: true},
    region: {type: String, required: true},
    email: {type: String, required: true},
    credits: { 
        type: Number, 
        default: 0 
    }
});

const MR = mongoose.model('MR', mrSchema)

export default MR;
