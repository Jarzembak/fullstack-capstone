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
        next()
    } catch (error) {
        return res.status(403).send(`Failed to authenticate token.`)
    }
};

// NOTE: Admin-only routes do not identify the user like the normal user routes do
const adminProtection = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            return res.status(401).send("No token provided.");
        }

        req.user = jwt.verify(token, process.env.JWT);

        if (!req.user.isAdmin) {
            return res.status(403).send(`User does not have sufficient privileges.`);
        }

        next();
    } catch (error) {
        return res.status(403).send(`Failed to authenticate token.`)
    }
};


module.exports = {
    protection,
    adminProtection
}