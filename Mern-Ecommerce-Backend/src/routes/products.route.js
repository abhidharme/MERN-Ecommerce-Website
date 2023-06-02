const express = require("express");
const {
    authenticate,
    isAdmin
} = require("../middlewares/auth.middleware");
const {
    createProductController,
    getAllProductController,
    singleProductController,
    updateProductController,
    deleteProductController,
    productPhotoController
} = require("../controllers/product.controller");
const formidable = require("express-formidable");
const router = express.Router();


// router

// CREATE PRODUCT
router.post("/create-product", authenticate, isAdmin, formidable(), createProductController);

// GET ALL PRODUCT
router.get("/get-product", getAllProductController);

// GET PHOTOS
router.get("/product-photo/:id", productPhotoController);

// GET SINGLE PRODUCT
router.get("/single-product/:slug", singleProductController);

// UPDATE PRODUCT
router.put("/update-product/:id", authenticate, isAdmin, formidable(), updateProductController);

// DELETE PRODUCT
router.delete("/delete-product/:id", authenticate, isAdmin, deleteProductController);


module.exports = router;
