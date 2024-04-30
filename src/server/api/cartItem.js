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

/*
router.post('/', async (req, res, next) => {
    try {
        const result = await prisma.cartItem.create({
            data: {
                productId: req.body.productId,
                cartId: req.body.cartId,
                quantity: req.body.quantity,
                price: req.body.price
            },
        });
        res.send(result);
    }
    catch (error) {
        next(error);
    };
});
*/

// TODO - routes requiring authentication

module.exports = router;