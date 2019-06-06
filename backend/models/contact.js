const mongoose = require('mongoose');

const contactTemplate = mongoose.Schema({
	name: String,
	lastName: String,
	phoneNumber: String,
	address: String,
	portfolio:String
});

module.exports = mongoose.model('Contact', contactTemplate);