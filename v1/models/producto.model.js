import mongoose from "mongoose";
const { Schema } = mongoose;

const productoSchema = new Schema({
    nombre: {type:String, required:true},
    descripcion: {type:String, required:true},
    precioCompraSinIva: {type:Number, required:true},
    precioCompraConIva: {type:Number, required:true},
    precioVenta: {type:Number, required:true},
    categoria: {type:Schema.Types.ObjectId, ref: "Categoria", required: true },
    subCategoria: {type:Schema.Types.ObjectId, ref: "SubCategoria", required: true },
    diferencial: {type:Schema.Types.ObjectId, ref: "Diferencial", required: true },
    estado: {type:Boolean, default:true},
    imagen: {type:String, required:true}
    
})

export default mongoose.model('Producto', productoSchema, "productos");