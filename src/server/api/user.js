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

// GET user by userId in request
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

// TODO - routes requiring authentication

module.exports = router;