const express = require("express");
const colors = require("colors");
//configure to dotenv
require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Wlwcome to ecommerce app</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`.gray.bgGreen.bold)
})