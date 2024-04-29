const express = require('express');
const router = express.Router();

router.use("/user", require("./user"))
router.use("/product", require("./product"))
router.use("/cart", require("./cart"))
router.use("/cartitem", require("./cartItem"))

module.exports = router;