const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    userid: {type: mongoose.Types.ObjectId, ref:'user.model'},
    tanggal_booking: String,
    waktu: Array,
    keluhan: String,
    alamat: String,
    status: String,
    area: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
