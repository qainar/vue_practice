import mongoose from "mongoose";

const EstateModel = new mongoose.Schema({
    name: {type: String},
    type: {type: String, enum: ["Квартира", "Дом", "Офис", "Участок", "Торговые здания"], required: true},
    district: {type: String, required: true},
    price: {type: Number, required: true},
    rooms: {type: Number},
    country: {type: String},
    city: {type: String},
    description: {type: String},
    isRent: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
})

export default mongoose.model('Estate', EstateModel)