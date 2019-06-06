const express = require('express');
const parser = require('body-parser');
const Contact = require('./models/contact');
const mongoose = require('mongoose');

let uri = "mongodb+srv://jamalyauhari:Test123456@contact-manager-hqrec.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true })
.then(() =>{
	console.log('Connected');
	}).catch(() => {
	console.log('Connection failed!');
	});

const app = express();

app.use(parser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
	next();
})

app.post("/api/contacts", (req, res, next) => {
	const post = new Contact({
		name: req.body.name,
		lastName: req.body.lastName,
		phoneNumber:req.body.phoneNumber,
		address: req.body.address,
		portfolio: req.body.portfolio
	});
	post.save();
	console.log(post);
	res.status(200).json();
});

app.get("/api/contacts", (req, res, nex) => {
	Contact.find()
		.then(contactsFromDataBase => {
			res.status(200).json({
				contacts: contactsFromDataBase
			});
		});
});

app.delete("/api/contacts/:id", (req, res, next) => {
	Contact.deleteOne({ _id: req.params.id })
		.then(deletedContact => {
			console.log(deletedContact);
			res.status(200).json({ message: "Contact deleted" });
	});
});

module.exports = app;


