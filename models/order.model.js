const mongoose = require('mongoose');






const LatLngSchema = new mongoose.Schema(

    {
        lat: { type: String, required: true },
        lng: { type: String, required: true },

    }
);

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        tags: { type: [String] },
        favorite: { type: Boolean, default: false },
        stars: { type: Number, required: true },
        imageUrl: { type: String, required: true },
        origins: { type: [String], required: true },
        arriveTime: { type: String, required: true }
    }, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
}
);

const OrderItemSchema = new mongoose.Schema({
    room: { type: schema, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }

});


const orderSchema = new mongoose.Schema({
   
    name: { type: String },
    address: { type: String },
    addressLatLng: { type: LatLngSchema, required: true },
    paymentId: { type: String },
    totalPrice: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }

});



module.exports = mongoose.model('Order', orderSchema);
