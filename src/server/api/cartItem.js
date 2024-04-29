const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

// GET all cartItems
router.get('/', async (req, res, next) => {
    try {
        const result = await prisma.cartItem.findMany();
        res.send(result);
    } catch (error) {
        next(error)
    }
})

// GET cartItems by cartId
router.get('/:cartId', async (req, res, next) => {
    try {
        const result = await prisma.cartItem.findMany({
            where: {
                cartId: Number(req.params.cartId),
            },
        });
        res.send(result);
    }
    catch (error) {
        next(error)
    }
});

// TODO - routes requiring authentication

module.exports = router;