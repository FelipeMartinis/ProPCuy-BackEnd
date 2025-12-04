import mongoose from 'mongoose';
const {Schema} = mongoose;

const diferencialSchema = new Schema({
    nombre: { type: String, required: true },
});

export default mongoose.model('Diferencial', diferencialSchema, "diferenciales");
