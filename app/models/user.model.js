const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nama: String,
    email: String,
    nohp: String,
    password: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', UserSchema);
