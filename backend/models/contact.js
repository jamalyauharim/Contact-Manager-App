const mongoose = require('mongoose');

const contactTemplate = mongoose.Schema({
	name: String,
	lastName: String,
	phoneNumber: String,
	address: String,
	portfolio: String,
	creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model('Contact', contactTemplate);