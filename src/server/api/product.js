const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

// GET all products
router.get('/', async (req, res, next) => {
    try {
        const result = await prisma.product.findMany();
        res.send(result);
    } catch (error) {
        next(error)
    }
})

// GET product by productId in request
router.get('/:productId', async (req, res, next) => {
    try {
        const result = await prisma.product.findUnique({
            where: {
                productId: Number(req.params.productId),
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