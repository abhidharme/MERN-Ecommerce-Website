const colors = require("colors");
const fs = require("fs");
const productsModel = require("../models/products.model");
const { default: slugify } = require("slugify");

const createProductController = async (req, res) => {
    try {
        const { product_title, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        const products = new productsModel({ ...req.fields, slug: slugify(product_title) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        return res.status(201).send({
            success: true,
            message: "product created Successfully",
            products
        });
    }
    catch (error) {
        console.log(error.message.bgRed.bold);
        return res.status(500).send({
            success: false,
            message: 'Error while creating product',
            error
        });
    }
};
const updateProductController = async (req, res) => {
    try {
        const { product_title, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        const products = await productsModel.findByIdAndUpdate(req.params.id, { ...req.fields, slug: slugify(product_title) }, { new: true });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        return res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products
        });
    }
    catch (error) {
        console.log(error.message.bgRed.bold);
        return res.status(500).send({
            success: false,
            message: 'Error While Updating Product',
            error
        });
    }
};


const getAllProductController = async (req, res) => {
    try {
        const products = await productsModel.find({}).populate("category").select("-photo").limit(12).sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: "All Products",
            products,
            total: products.length
        });
    }
    catch (error) {
        console.log(error.message.bgRed.bold);
        return res.status(500).send({
            success: false,
            message: 'Error while getting product',
            error
        });
    }
};

const singleProductController = async (req, res) => {
    try {
        const products = await productsModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
        res.status(200).send({
            success: true,
            message: "Single product fetched",
            products
        });
    }
    catch (error) {
        console.log(error.message.bgRed.bold);
        return res.status(500).send({
            success: false,
            message: 'Error while getting single product',
            error
        });
    }
};

const productPhotoController = async (req, res) => {
    try {
        const products = await productsModel.findById(req.params.id).select("photo");
        if (products.photo.data) {
            res.set("Content-type", products.photo.contentType);
            return res.status(200).send(products.photo.data);
        }
    }
    catch (error) {
        console.log(error.message.bgRed.bold);
        return res.status(500).send({
            success: false,
            message: 'Error while getting photos',
            error
        });
    }
};

const deleteProductController = async (req, res) => {
    try {
        const products = await productsModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: "Products delete successfully",
            products
        });
    }
    catch (error) {
        console.log(error.message.bgRed.bold);
        return res.status(500).send({
            success: false,
            message: 'Error while creating product',
            error
        });
    }
};

const filterProductsController = async (req, res) => {
    try {
        const { cheked, radio } = req.body;
        let args = {};
        if (checkServerIdentity.length > 0) {
            args.cheked = cheked;
        }
        if (radio.length) {
            args.radio = { $gte: radio[0], $lte: radio[1] };
        }
        const products = await productsModel.find(args);
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error.message.bgRed.bold);
        return res.status(500).send({
            success: false,
            message: 'Error while filtering product',
            error
        });
    }
}

const productCountController = async (req, res) => {
    try {
        const total = await productsModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total
        })
    }
    catch (error) {
        console.log(error.message.bgRed.bold);
        return res.status(500).send({
            success: false,
            message: 'Error while counting product',
            error
        });
    }
}

const productListController = async (req, res) => {
    try {
        const perPage = 2;
        const page = req.params.page ? req.params.page : 1;
        const products = await productsModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products
        });
    }
    catch (error) {
        console.log(error.message.bgRed.bold);
        return res.status(500).send({
            success: false,
            message: 'Error in per page ctrl',
            error
        });
    }
};

const productSearchController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const result = await productsModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },// "i" means case sensetive
                { decription: { $regex: keyword, $options: "i" } },// "i" means case sensetive
            ]
        }).select("-photo");
        return res.json(result);
    }
    catch (error) {
        console.log(error.message.bgRed.bold);
        return res.status(500).send({
            success: false,
            message: 'Error in Search product page ctrl',
            error
        });
    }
};

const relatedProoductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productsModel.find({
            category: cid,
            _id: { $ne: pid }
        }).limit(4).select("-photo").populate("category");
        return res.status(200).send({
            success: true,
            products
        })
    }
    catch (error) {
        console.log(error.message.bgRed.bold);
        return res.status(500).send({
            success: false,
            message: 'Error while getting similar products',
            error
        });
    }
}

module.exports = {
    createProductController,
    updateProductController,
    deleteProductController,
    getAllProductController,
    singleProductController,
    productPhotoController,
    filterProductsController,
    productCountController,
    productListController,
    productSearchController,
    relatedProoductController
};
