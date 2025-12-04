import { populate } from "dotenv";
import mongoose from "mongoose";
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    rol: {type: String, required: true, enum: ["admin", "user"], default: "user"},
})



export default mongoose.model('Usuario', usuarioSchema);