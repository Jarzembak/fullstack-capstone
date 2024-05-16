const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { Decimal } = require("@prisma/client/runtime/library");
const prisma = new PrismaClient();
const auth = require('../auth');

// GET all products
router.get('/', async (req, res, next) => {
  try {
    const result = await prisma.product.findMany();
    res.send(result);
  } catch (error) {
    next(error);
  }
})

/*
GET a number of products, with custom criteria
req.body should have:
{
  pagination: Number // The number of results per page
  goToPage: Number // Page will be calculated as (pagination * (goToPage - 1))
  nameContains: String // String to search the product name for
  orderBy: String // The Product column you want to search by
  orderDir: String // Must be 'asc' or 'desc'
}
*/
router.get('/search', async (req, res, next) => {
    try {
        const toPage = (req.body.pagination * (req.body.goToPage - 1))
        if (toPage < 0) { toPage = 0 }

        const result = await prisma.product.findMany({
          skip: toPage,
          take: req.body.pagination,
          where: {
            name: {
              contains: req.body.nameContains,
            },
          },
          orderBy: {
            [req.body.orderBy]: req.body.orderDir,
          },
        });
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

// POST a new product
router.post('/', auth.adminProtection, async (req, res, next) => {
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
router.put('/:productId', auth.adminProtection, async (req, res, next) => {
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

// DELETE a product with the requested productId
router.delete('/:productId', auth.adminProtection, async (req, res, next) => {
  try {
    const result = await prisma.cartItem.delete({
      where: {
        productId: Number(req.params.cartId),
      }
    });
    res.sendStatus(204);
  }
  catch (error) {
    next(error);
  };
});

module.exports = router;
