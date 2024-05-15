const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all cartItems
router.get('/', require("../auth"), async (req, res) => {
    try {
        const result = await prisma.cartItem.findMany();
        res.send(result);
    } catch (error) {
        next(error)
    };
});

// TODO - routes requiring authentication

module.exports = router;