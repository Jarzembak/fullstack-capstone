const express = require('express');
const router = express.Router();

router.use("/users", require("./user"))
router.use("/products", require("./product"))
router.use("/carts", require("./cart"))
router.use("/cart-items", require("./cartItem"))

module.exports = router;