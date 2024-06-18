const express = require("express");
const router = express.Router();



const authRoute = require("./auths.js");
const productRoute = require("./product.js");





router.use("/auth",authRoute);
router.use("/product",productRoute);



module.exports = router;