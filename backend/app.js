const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const userRoutes = require("./routes/user");
const contactsRoutes = require("./routes/contacts");


let uri = "mongodb+srv://jamalyauhari:Test123456@contact-manager-hqrec.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true })
	.then(() => {
		console.log('Connected');
		}).catch(() => {
		console.log('Connection failed!');
		});

app.use(parser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
	next();
});

app.use("/api/contacts", contactsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;


