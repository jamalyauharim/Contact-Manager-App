const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

	try {
		console.log(req.headers);
		const token = req.headers.authorization.split(" ")[1];
		jwt.verify(token, "test_long_Text");
		next();
	} catch (error) {
		console.log(req.headers);
		res.status(401).json({ message: "Auth failed!" });
	}

};