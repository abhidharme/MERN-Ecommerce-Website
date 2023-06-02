//configure env
require("dotenv").config();
const express = require("express");
const colors = require("colors");
const morgan = require("morgan");

const connectDatabase = require("./config/db");
const authRoutes = require("./routes/auth.route");
const categoryRoutes = require("./routes/category.route");
const productRoutes = require("./routes/products.route");

//rest object
const app = express();

//middlewares       
app.use(express.json());
app.use(morgan('dev')); // to check which API is hit

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);

app.get("/users", (req, res) => {
    res.send("<h1>Wlwcome to ecommerce app</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    try {
        console.log(`running on port ${PORT}`.white.bgGreen.bold);
        await connectDatabase();
    }
    catch (err) {
        console.log(err.message.bgRed.bold);
    }
});