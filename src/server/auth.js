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
        // No ID verification
        console.log("verify token:", req.user.userId)
        next()
    } catch (error) {
        return res.status(403).send(`Failed to authenticate token.`)
    }
};

const loginProtection = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            return res.status(401).send("No token provided.");
        }

        req.user = jwt.verify(token, process.env.JWT);

        if (req.params.id != req.user.userId) {
            return res.status(401).send("Token does not match user.")
        }

        console.log("verify token:", req.user.userId)
        next()
    } catch (error) {
        return res.status(403).send(`Failed to authenticate token.`)
    }
};

const adminProtection = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        
        if (!token) {
            return res.status(401).send("No token provided.");
        }

        req.user = jwt.verify(token, process.env.JWT);

        if (!req.user.isAdmin) {
            return res.status(403).send("User does not have sufficient privileges.");
        }

        next();
    } catch (error) {
        return res.status(403).send(`Failed to confirm access privileges.`)
    }
};


module.exports = {
    protection,
    loginProtection,
    adminProtection
}