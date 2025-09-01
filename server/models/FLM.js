import mongoose from "mongoose";

const flmSchema = new mongoose.Schema({
    name: {type: String, required: true},
    id: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: {type: mongoose.Schema.Types.ObjectId, ref:'Admin', required: true},
    slm: {type: mongoose.Schema.Types.ObjectId, ref:'SLM', required: true},
    MR: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MR' }],
    role:{type: String, default:'flm'},
    hq: {type: String, required: true},
    zone: {type: String, required: true},
    region: {type: String, required: true},
    credits: { 
        type: Number, 
        default: 0 
    }
});

const FLM = mongoose.model('FLM', flmSchema);

export default FLM;