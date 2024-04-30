const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

// GET all users
router.get('/', async (req, res, next) => {
    try {
        const result = await prisma.user.findMany();
        res.send(result);
    } catch (error) {
        next(error)
    }
})

// GET user by userId
router.get('/:userId', async (req, res, next) => {
    try {
        const result = await prisma.user.findUnique({
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

// GET userId's cart with cartStatus 'current', with associated cartItems
// There should be ONLY ONE with cartStatus 'current'
router.get('/:userId/cart/current', async (req, res, next) => {
    try {
        const result = await prisma.cart.findFirst({
            where: {
                userId: Number(req.params.userId),
                cartStatus: 'current',
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

// GET all carts by userId in request, with associated cartItems
router.get('/:userId/cart/history', async (req, res, next) => {
    try {
        const result = await prisma.cart.findMany({
            where: {
                userId: Number(req.params.userId),
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


// TODO - authentication

module.exports = router;