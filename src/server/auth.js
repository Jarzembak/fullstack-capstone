// Authentication middleware
const jwt = require("jsonwebtoken");
const process = require("process");

const protection = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return res.status(401).send("No token provided.");
        }
        req.user = jwt.verify(token, process.env.JWT);
        console.log(req.user)
        next();
    } catch (error) {
        return res.status(403).send(`Failed to authenticate token.`)
    }
};

/*
const adminProtection = async (req, res, next) => {
    try {
        const admin = req.headers.authorization.split(" ")[1]
        if (!admin) {
            return res.status(401).send("No token provided.");
        }
        req.user = jwt.verify(admin, process.env.JWT);
        console.log(req.user)
        next();
    } catch (error) {
        return res.status(403).send(`Failed to authenticate token.`)
    }
};
*/

module.exports = {
    protection,
    // adminProtection
}