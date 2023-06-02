const colors = require("colors");
const categoryModel = require("../models/category.model");
const { default: slugify } = require("slugify");


const createCategoryController = async (req, res) => {
    try {
        const { category_name } = req.body;
        //check category exist
        const existingCategory = await categoryModel.findOne({ category_name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category Already Exist',
            });
        };
        const category = await categoryModel.create({ category_name, slug: slugify(category_name) });
        return res.status(201).send({
            success: true,
            message: "New Ctaegory created",
            category
        });

    } catch (error) {
        console.log(error.message.bgRed.bold);
        return res.status(500).send({
            success: false,
            message: 'Error in Category',
            error
        });
    }
};


const updateCategoryController = async (req, res) => {
    try {
        const { category_name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { category_name, slug: slugify(category_name) }, { new: true });
        return res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            category
        });

    } catch (error) {
        console.log(error.message.bgRed.bold);
        return res.status(500).send({
            success: false,
            message: 'Error while updating Category',
            error
        });
    }
}

const getCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({}).lean().exec();
        return res.status(201).send({
            success: true,
            message: "All Categories List",
            category
        });
    }
    catch (error) {
        console.log(error.message.bgRed.bold);
        return res.status(500).send({
            success: false,
            message: 'Error while getting Category',
            error
        });
    }
}

const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        return res.status(201).send({
            success: true,
            message: "Single Category",
            category
        });
    }
    catch (error) {
        console.log(error.message.bgRed.bold);
        return res.status(500).send({
            success: false,
            message: 'Error while getting single Category',
            error
        });
    }
}

const deleteCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findByIdAndDelete(req.params.id);
        return res.status(201).send({
            success: true,
            message: "Delete Category Successfully",
            category
        });
    }
    catch (error) {
        console.log(error.message.bgRed.bold);
        return res.status(500).send({
            success: false,
            message: 'Error while getting single Category',
            error
        });
    }
}

module.exports = { createCategoryController, updateCategoryController, getCategoryController, singleCategoryController, deleteCategoryController }