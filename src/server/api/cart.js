const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

// GET all carts
router.get('/', async (req, res, next) => {
    try {
        const result = await prisma.cart.findMany();
        res.send(result);
    } catch (error) {
        next(error)
    }
})

// GET cart by cartId in request
router.get('/:cartId', async (req, res, next) => {
    try {
        const result = await prisma.cart.findUnique({
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

// GET carts by userId in request
router.get('/:userId', async (req, res, next) => {
    try {
        const result = await prisma.cart.findMany({
            where: {
                userId: Number(req.params.userId),
            },
        });
        res.send(result);
    }
    catch (error) {
        next(error)
    }
});

// GET 'current' cart by userId in request, with all associated cartItems
// There should be ONLY ONE with cartStatus 'current'
router.get('/:userId/current', async (req, res, next) => {
    try {
        const result = await prisma.cart.findFirst({
            where: {
                userId: Number(req.params.userId),
                cartStatus: 'current',
            },
            include: {
                cartItems: true,
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