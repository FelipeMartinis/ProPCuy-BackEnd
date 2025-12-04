import mongoose from 'mongoose';
const {Schema} = mongoose;

const categoriaSchema = new Schema({
    nombre: { type: String, required: true },
});

export default mongoose.model('SubCategoria', categoriaSchema, "subCategorias");
