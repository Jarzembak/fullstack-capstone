const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { Decimal } = require("@prisma/client/runtime/library");
const prisma = new PrismaClient();
const auth = require("../auth");

// GET all products
router.get("/", async (req, res, next) => {
  try {
    const result = await prisma.product.findMany();
    res.send(result);
  } catch (error) {
    next(error);
  }
});

/*
GET a number of products with custom search criteria

The URL should be followed by:
  ?pagination=<Number>&goToPage=<Number>&nameContains=<String>&categoryContains=<String>&orderBy=<String>&orderDir=<'asc' or 'desc'>

pagination: Number // The number of results per page
goToPage: Number // Page will be calculated as (pagination * (goToPage - 1))
nameContains: String // String to search the product name for
categoryContains: String // String to search for the product's category
orderBy: String // The Product column you want to search by
sortBy: String // Must be 'asc' or 'desc'
*/
router.get("/search", async (req, res, next) => {
  try {
    const toPage = req.query.pagination * (req.query.goToPage - 1);
    if (toPage < 0) {
      toPage = 0;
    }

    const result = await prisma.product.findMany({
      skip: Number(toPage),
      take: Number(req.query.pagination),
      where: {
        name: {
          contains: req.query.nameContains,
        },
        category: {
          contains: req.query.categoryContains,
        },
      },
      orderBy: {
        [req.query.orderBy]: req.query.sortBy,
      },
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
});

/* W.I.P.
Same as above search route, but returns an array including BOTH the search results and the number of records found.
*/
router.get("/searchv2", async (req, res, next) => {
  try {
    const toPage = req.query.pagination * (req.query.goToPage - 1);
    if (toPage < 0) {
      toPage = 0;
    }

    const result = await prisma.$transaction([
      prisma.product.count({
        where: {
          name: {
            contains: req.query.nameContains,
          },
          category: {
            contains: req.query.categoryContains,
          },
        },
      }),
      prisma.product.findMany({
        skip: Number(toPage),
        take: Number(req.query.pagination),
        where: {
          name: {
            contains: req.query.nameContains,
          },
          category: {
            contains: req.query.categoryContains,
          },
        },
        orderBy: {
          [req.query.orderBy]: req.query.sortBy,
        },
      }),
    ]);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// GET product by productId in request
router.get("/:productId", async (req, res, next) => {
  try {
    const result = await prisma.product.findUnique({
      where: {
        productId: Number(req.params.productId),
      },
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// POST a new product
router.post("/", auth.adminProtection, async (req, res, next) => {
  try {
    const result = await prisma.product.create({
      data: {
        name: String(req.body.name),
        isVisible: Boolean(req.body.isVisible),
        imageUrl: String(req.body.imageUrl),
        description: String(req.body.description),
        price: Decimal(req.body.price),
      },
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// PUT product data into an existing product
router.put("/:productId", auth.adminProtection, async (req, res, next) => {
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
  } catch (error) {
    next(error);
  }
});

// DELETE a product with the requested productId
router.delete("/:productId", auth.adminProtection, async (req, res, next) => {
  try {
    const result = await prisma.cartItem.delete({
      where: {
        productId: Number(req.params.cartId),
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
