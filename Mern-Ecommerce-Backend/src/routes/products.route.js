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
    productPhotoController,
    filterProductsController,
    productCountController,
    productListController,
    productSearchController
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

// FILTER PRODUCTS
router.post("/products-filter", filterProductsController);

// PRODUCTS COUNT
router.get("/products-count", productCountController);

// PRODUCTS PER PAGE
router.get("/products-list/:page", productListController);

// SEARCH PRODUCT
router.get("/search-product/:keyword", productSearchController);

module.exports = router;
