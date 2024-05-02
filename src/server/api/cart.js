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
        next(error);
    };
});

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
        next(error);
    };
});

// GET cart by ID in request, with all cartItems associated with that ID
router.get(':cartId/items', async (req, res, next) => {
    try {
        const result = await prisma.cart.findFirst({
            where: {
                cartId: Number(req.params.cartId),
            },
            include: {
                cartitems: true,
            },
        });
        res.send(result);
    }
    catch (error) {
        next(error);
    };
});

// POST a new cart and set cartStatus to 'current'
// Should be used after checkout
// The old cart's status should be set to 'processing' before this
router.post('/', async (req, res, next) => {
    try {
        const result = await prisma.cart.create({
            data: {
                cartStatus: 'current',
                userId: req.body.userId,
                cartItems: req.body.cartItems,
            },
        });
        res.send(result);
    }
    catch (error) {
        next(error);
    };
});

// PUT cart data into an existing cart
router.put('/:cartId', async (req, res, next) => {
    try {
        const result = await prisma.user.update({
            where: {
                cartId: Number(req.params.cartId),
            },
            data: {
                cartStatus: req.body.cartStatus,
                cartItems: req.body.cartItems,
            },
        });
        res.send(result);
    }
    catch (error) {
        next(error);
    };
});

// TODO - routes requiring authentication

module.exports = router;