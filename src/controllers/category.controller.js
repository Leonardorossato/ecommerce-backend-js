const Category = require("../models/category.model");

class CategoryController {
  static create = async (req, res) => {
    try {
      const category = await Category.create(req.body);
      await category.save();
      return res.status(201).json(category);
    } catch (error) {
      return res.status(400).json({ message: "Error creating category" });
    }
  };

  static findAll = async (req, res) => {
    try {
      const category = await Category.find();
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ message: "Error to find all category" });
    }
  };

  static findOne = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        return res
          .status(404)
          .json({ message: `Category with this id: ${id} not found` });
      }
      return res.status(200).json(category);
    } catch (error) {
      return res.status(400).json({ message: "Category not exists" });
    }
  };

  static update = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        return res
          .status(404)
          .json({ message: `Category with this id: ${id} not found` });
      }
      await Category.findByIdAndUpdate(id, req.body, { new: true });
      return res
        .status(200)
        .json({ message: "Category updated successfully." });
    } catch (error) {
      return res.status(400).json({ message: "Category can not be updated" });
    }
  };
  static delete = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        return res
          .status(404)
          .json({ message: `Category with this id: ${id} not found` });
      }

      await Category.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "Category deleted successfully." });
    } catch (error) {
      return res.status(400).json({ message: "Error while deleting category" });
    }
  };
}

module.exports = CategoryController;
