const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

// GET all users
router.get('/', async (req, res) => {
    try {
        const result = await prisma.user.findMany();
        res.send(result);
    } catch (error) {
        next(error)
    }
})

// GET user by userId
router.get('/:userId', async (req, res) => {
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
router.get('/:userId/cart', async (req, res) => {
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
router.get('/:userId/history', async (req, res) => {
    try {
        const result = await prisma.cart.findMany({
            where: {
                userId: Number(req.params.userId),
            },
            include: {
                cartItems: true,
            },
        });
        res.send(result);
    }
    catch (error) {
        next(error);
    };
});

// POST a new user
router.post('/', async (req, res) => {
    try {
        const result = await prisma.user.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                streetAddress: req.body.streetAddress,
                city: req.body.city,
                zipcode: req.body.zipcode,
                billingAddress: req.body.billingAddress,
                billingCity: req.body.billingCity,
                billingZipcode: req.body.billingZipcode,
                phone: req.body.phone,
            },
        });
        res.send(result);
    }
    catch (error) {
        next(error);
    };
});

// PUT user data into an existing user
router.put('/:userId', async (req, res) => {
    try {
        const result = await prisma.user.update({
            where: {
                userId: Number(req.params.userId),
            },
            data: {
                isAdmin: req.body.isAdmin,
                isGuest: req.body.isGuest,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                streetAddress: req.body.streetAddress,
                city: req.body.city,
                zipcode: req.body.zipcode,
                billingAddress: req.body.billingAddress,
                billingCity: req.body.billingCity,
                billingZipcode: req.body.billingZipcode,
                phone: req.body.phone,
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