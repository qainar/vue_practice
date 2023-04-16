import mongoose from "mongoose";

const OrderModel = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    estateId: {type: mongoose.Schema.Types.ObjectId, ref: 'Estate', required: true}
})

export default mongoose.model('Order', OrderModel)