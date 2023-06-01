const express = require("express");
const { authenticate, isAdmin } = require("../middlewares/auth.middleware");
const { createCategoryController, updateCategoryController, getCategoryController, singleCategoryController, deleteCategoryController } = require("../controllers/createCategory.controller");

const router = express.Router();

// routes

// CREATE CATEGORY
router.post("/create-category", authenticate, isAdmin, createCategoryController);

// UPDATE CATEGORY
router.put("/update-category/:id", authenticate, isAdmin, updateCategoryController);

// GET CATEGORY
router.get("/get-category", getCategoryController);

// GET SINGLE CATEGORY
router.get("/single-category/:slug", singleCategoryController);

// DELETE CATEGORY
router.delete("/delete-category/:id", deleteCategoryController);

module.exports = router;