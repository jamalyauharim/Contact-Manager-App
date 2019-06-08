const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userTemplate = mongoose.Schema({
	email: { type: String, unique: true },
	password: { type: String }
});

// checks for unique validation
userTemplate.plugin(uniqueValidator);

module.exports = mongoose.model('User', userTemplate);