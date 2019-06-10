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
		portfolio: req.body.portfolio,
		creator: req.userData.userId
	});
	contact.save();
	console.log(contact);
	res.status(200).json();
});

router.get("", checkAuthorization, (req, res, nex) => {
	Contact.find({ creator: req.userData.userId })
		.then(contactsFromDataBase => {
			res.status(200).json({
				contacts: contactsFromDataBase
			});
		});
});

router.get("/:id", (req, res, next) => {
	Contact.findById(req.params.id).then(contact => {
		if (contact) {
			res.status(200).json(contact);
		} else {
			res.status(404).json({message: 'Contact not found.'});
		}
	})
});

router.put("/:id", (req, res, next) => {
	const contact = new Contact({
		_id: req.body.id,
		name: req.body.name,
		lastName: req.body.lastName,
		phoneNumber:req.body.phoneNumber,
		address: req.body.address,
		portfolio: req.body.portfolio,
	});
	Contact.updateOne({_id: req.params.id}, contact).then(result => {
		res.status(200).json({message: 'contact updated!'});
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