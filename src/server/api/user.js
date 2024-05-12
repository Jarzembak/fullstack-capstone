const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// GET all users
// !! Route is not secure !!
router.get('/', async (req, res, next) => {
    try {
        const result = await prisma.user.findMany();
        res.send(result);
    } catch (error) {
        next(error)
    }
})


// GET user by userId (secure version)
router.get('/:userId', require('../auth'), async (req, res, next) => {
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
// ... AND the products associated with each cartItem
// There should be ONLY ONE cart with cartStatus 'current' per user
router.get('/cart', require('../auth'), async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const result = await prisma.cart.findFirst({
            where: {
                userId,
                cartStatus: 'current',
            },
            include: {
                cartItems: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        res.send(result);
    }
    catch (error) {
        next(error);
    };
});

// GET user by userId
// !! Route is not secure !!
router.get('/:userId', require('../auth'), async (req, res, next) => {
    try {
        const { id: userId } = req.user;

        const result = await prisma.user.findUnique({
            where: {
                userId
            },
        });
        res.send(result);
        console.log("GetUserById", result)
    }
    catch (error) {
        next(error)
    }
});


// GET all carts by userId in request, with associated cartItems
router.get('/:userId/history', require('../auth'), async (req, res, next) => {
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

// POST a new user (Registration)
router.post('/', async (req, res, next) => {

    const salt_rounds = 5;
    const hashedPassword = await bcrypt.hash(req.body.password, salt_rounds);

    try {
        const result = await prisma.user.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: req.body.password || hashedPassword,
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

        res.status(201).send(result);
    }
    catch (error) {
        console.log(error)
        // next(error);
    };
});

// POST user login
router.post("/login", async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username: req.body.username }
        })

        if (!user) {
            return res.status(401).send("Invalid Login");
        }

        const isValid = req.body.password == user.password || await bcrypt.compare(req.body.password, user.password);

        if (!isValid) {
            return res.status(401).send("Invalid Login");
        }

        const token = jwt.sign({ id: user.userId }, process.env.JWT);

        res.send({
            token,
            user: { // What info is needed here?
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                // password excluded
                email: user.email,
                streetAddress: user.streetAddress,
                city: user.city,
                zipcode: user.zipcode,
                billingAddress: user.billingAddress,
                billingCity: user.billingCity,
                billingZipcode: user.billingZipcode,
                phone: user.phone,
            }
        })
    } catch (err) {
        next(err);
    }
});

// PUT user data into an existing user
router.put('/:userId', require('../auth'), async (req, res, next) => {

    const salt_rounds = 5;
    const hashedPassword = await bcrypt.hash(req.body.password, salt_rounds);

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
                password: hashedPassword,
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

module.exports = router;