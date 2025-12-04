import mongoose from "mongoose";
const { Schema } = mongoose;

const carritoSchema = new Schema({
    productos: [
        {
            producto: { 
                type: Schema.Types.ObjectId, 
                ref: "Producto",
                required: true 
            },
            cantidad: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            }
        }
    ],

    total: {
        type: Number,
        default: 0
    },

    estado: {
        type: String,
        enum: ["abierto", "cerrado"],
        default: "abierto"
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: false
    },

    fechaCierre: {
    type: Date
}

});

export default mongoose.model('Carrito', carritoSchema, "carritos");