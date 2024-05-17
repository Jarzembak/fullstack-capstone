const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { Decimal } = require("@prisma/client/runtime/library");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// GET all carts (Admin only)
router.get('/', auth.adminProtection, async (req, res, next) => {
  try {
    const result = await prisma.cart.findMany();
    res.send(result);
  } catch (error) {
    next(error);
  };
});

// GET any cart by cartId in request (Admin only)
router.get('/:cartId', auth.adminProtection, async (req, res, next) => {
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
// ... AND each product associated with each cartItem
router.get('/:cartId/all-items', auth.protection, async (req, res, next) => {
  try {
    const result = await prisma.cart.findFirst({
      where: {
        cartId: Number(req.params.cartId),
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

// POST a new cart and set cartStatus to 'current'
// Should be used after checkout, and cannot be created with cartItems
// The old cart's cartStatus should be set to 'processing' before this is used
router.post('/', auth.protection, async (req, res, next) => {
  try {

    const result = await prisma.cart.create({
      data: {
        cartStatus: 'current',
        userId: req.user.userId,
      },
    });
    res.send(result);
  }
  catch (error) {
    next(error);
  };
});

// GET cart by ID in request, with all cartItems associated with that ID
router.get('/:cartId/all-items', auth.protection, async (req, res, next) => {
  try {
    const result = await prisma.cart.findFirst({
      where: {
        cartId: Number(req.params.cartId),
        userId: Number(req.user.userId)
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

// GET cart by ID in request, with all cartItems associated with that ID
// ... AND each product associated with each cartItem
router.get('/:cartId/all-items-and-products', auth.protection, async (req, res, next) => {
  try {
    const result = await prisma.cart.findFirst({
      where: {
        cartId: Number(req.params.cartId),
        userId: Number(req.user.userId)
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

// POST cartItem with cart ID
// Called when adding an item to the cart.
router.post('/item', auth.protection, async (req, res, next) => {
  try {
    const result = await prisma.cartItem.create({
      data: {
        cartId: Number(req.body.cartId),
        productId: Number(req.body.productId),
        quantity: Number(req.body.quantity),
        price: Decimal(req.body.price)
      }
    });
    res.send(result);
  }
  catch (error) {
    next(error);
  };
});

// PUT cartItem data
router.put('/item', auth.protection, async (req, res, next) => {
  try {
    const result = await prisma.cartItem.update({
      where: {
        productId_cartId: {
          cartId: Number(req.body.cartId),
          productId: Number(req.body.productId)
        },
        cart: {
            userId: req.user.userId,
        }
      },
      data: {
        cartId: Number(req.body.cartId),
        productId: Number(req.body.productId),
        quantity: Number(req.body.quantity),
        price: Decimal(req.body.price)
      }
    });
    res.send(result);
  }
  catch (error) {
    next(error);
  };
});



// PUT cart data into an existing cart
// For now, used only for changing cartStatus
router.put('/:cartId', auth.protection, async (req, res, next) => {
  try {
    const result = await prisma.cart.update({
      where: {
        cartId: Number(req.params.cartId),
      },
      data: {
        cartStatus: req.body.cartStatus,
      },
    });
    res.send(result);
  }
  catch (error) {
    next(error);
  };
});

// DELETE cartItem with cartId and productId
router.delete('/item', auth.protection, async (req, res, next) => {
  try {
    const result = await prisma.cartItem.delete({
      where: {
        productId_cartId: {
          cartId: Number(req.body.cartId),
          productId: Number(req.body.productId)
        }
      },
    });
    res.sendStatus(204);
  }
  catch (error) {
    next(error);
  };
});

// DELETE ALL cartItems with cartId
// This deletes all cartItems associated with the cartId, clearing the cart
router.delete('/item/:cartId', auth.protection, async (req, res, next) => {
  try {
    const result = await prisma.cartItem.deleteMany({
      where: {
        cartId: Number(req.params.cartId),
        cart: {
          cartStatus: 'current',
        },
      },
    });
    res.sendStatus(204);
  }
  catch (error) {
    next(error);
  };
});

// GET cart by ID in request, with all cartItems associated with that ID
// ... AND each product associated with each cartItem
router.get('/:cartId/all-items-and-products', auth.protection, async (req, res, next) => {
  try {
    const result = await prisma.cart.findFirst({
      where: {
        cartId: Number(req.params.cartId),
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

module.exports = router;
