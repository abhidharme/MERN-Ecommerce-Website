const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category_name: { type: String, require: true, unique: true },
    slug: { type: String, lowercase: true }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("category", categorySchema);