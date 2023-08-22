const express = require("express");
const app = express();
const cores = require("cors");
const cookies = require("cookie-parser");
const processEnv = require("./env/envoriment");
const mongooseConenction = require("./config/mongo.config");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const productRouter = require("./routes/product.route");
const blogRouter = require("./routes/blog.route");
const categoryRouter = require("./routes/category.route");
const blogCategory = require("./routes/blog.category.route");
const brandRouter = require("./routes/brand.route");
const cupomRouter = require("./routes/cupom.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cores());
app.use(cookies());

mongooseConenction();

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blog-category", blogCategory);
app.use("/api/brand", brandRouter);
app.use("/api/cupom", cupomRouter); 

app.listen(processEnv.APP_PORT, () => {
  console.log(`Server application is running at ${processEnv.APP_PORT}`);
});
