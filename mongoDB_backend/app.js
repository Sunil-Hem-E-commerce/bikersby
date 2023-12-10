const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");

const productsRouter = require("./controllers/products");
const productAdminRouter = require("./controllers/product_admin");

const file = require("express-fileupload");
const indexRouter = require("./Routes");

require("./script");
require("./models/");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(file({ useTempFiles: true }));

app.use("/", indexRouter);
app.use("/api/products", productsRouter);
app.use("/admin/products", productAdminRouter);
// app.use("/", testingRouter);
// code to serve the public static files;
app.use("/admin", express.static("public"));

// if (process.env.NODE_ENV === "test") {
const testingRouter = require("./controllers/testing");
app.use("/api/testing", testingRouter);
// }

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
