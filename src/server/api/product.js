const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const { Decimal } = require('@prisma/client/runtime/library');
const prisma = new PrismaClient();

// GET all products
router.get('/', async (req, res) => {
    try {
        const result = await prisma.product.findMany();
        res.send(result);
    } catch (error) {
        next(error)
    }
})

/* Work in progress: GET the first 10 products, sorted by name (ascending)
req.body should have:
{
    pagination: Number // The number of results per page
    skipToResult: Number // (pagination * <number of the page you want - 1>)
    orderBy: parameter // The field of the object you want to search by
}

router.get('/search', async (req, res, next) => {
    try {
        const result = await prisma.product.findMany({
            orderBy: {
                name: 'asc',
            },
        });
        res.send(result);
    } catch (error) {
        next(error)
    }
})
*/

// GET product by productId in request
router.get('/:productId', async (req, res) => {
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

// POST a new product
router.post('/', async (req, res) => {
    try {
        const result = await prisma.product.create({
            data: {
                name: String(req.body.name),
                isVisible: Boolean(req.body.isVisible),
                imageUrl: String(req.body.imageUrl),
                description: String(req.body.description),
                price: Decimal(req.body.price),
            }
        });
        res.send(result);
    }
    catch (error) {
        next(error);
    };
});

// PUT product data into an existing product
router.put('/:productId', async (req, res) => {
    try {
        const result = await prisma.product.update({
            where: {
                productId: Number(req.params.productId),
            },
            data: {
                name: String(req.body.name),
                isVisible: Boolean(req.body.isVisible),
                imageUrl: String(req.body.imageUrl),
                description: String(req.body.description),
                price: Decimal(req.body.price),
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