const Product = require("../models/product.model");
const slugify = require("slugify");

class ProductController {
  static create = async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const product = await Product.create(req.body);
      await product.save();
      return res.status(201).json(product);
    } catch (error) {
      return res.status(403).json({ message: "Error creating this product" });
    }
  };

  static findAll = async (req, res) => {
    try {
      const product = await Product.find();
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json("Error to find all products");
    }
  };

  static queryPagination = async (req, res) => {
    try {
      //Filtering
      const queryObject = { ...req.query };
      const excludeFields = ["page", "sort", "limit", "fields"];
      excludeFields.forEach((el) => delete queryObject[el]);
      let queryString = JSON.stringify(queryObject);
      queryString = queryString.replace(
        /\b(get|gt|let|lt)\b/g,
        (match) => `$${match}`
      );

      let query = Product.find(JSON.parse(queryString));

      //Sorting
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");
      }

      //Limiting the fields
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.sort(fields);
      } else {
        query = query.select("-__v");
      }

      //Pagination
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        const productCount = await Product.countDocuments();
        if (skip >= productCount) {
          return res.status(404).send("This product does not exist");
        }
      }
      const product = await query;
      return res.status(200).send(product);
    } catch (error) {
      return res.status(500).json({ message: "Error to do pagination" });
    }
  };

  static findOne = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json(`Error to find a product with id ${id}`);
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json("Product with this id not exists.");
    }
  };

  static update = async (req, res) => {
    try {
      const { id } = req.params;
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json(`Error to find a product with id ${id}`);
      }
      await Product.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json("Product updated successfuly.");
    } catch (error) {
      return res.status(403).json({ message: `Error to update this prodcut` });
    }
  };

  static delete = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Product.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json(`Error to find a user with id ${id}`);
      }
      return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error deleting user with id ${id}` });
    }
  };
}

module.exports = ProductController;
