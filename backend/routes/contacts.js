const express = require("express");
const Contact = require('../models/contact');
const checkAuthorization = require("../mid/check-authentication");

const router = express.Router();

router.post("", checkAuthorization, (req, res, next) => {
	const contact = new Contact({
		name: req.body.name,
		lastName: req.body.lastName,
		phoneNumber:req.body.phoneNumber,
		address: req.body.address,
		portfolio: req.body.portfolio
	});
	contact.save();
	console.log(contact);
	res.status(200).json();
});

router.get("", (req, res, nex) => {
	Contact.find()
		.then(contactsFromDataBase => {
			res.status(200).json({
				contacts: contactsFromDataBase
			});
		});
});

router.delete("/:id", (req, res, next) => {
	Contact.deleteOne({ _id: req.params.id })
		.then(deletedContact => {
			console.log(deletedContact);
			res.status(200).json({ message: "Contact deleted" });
	});
});

module.exports = router;