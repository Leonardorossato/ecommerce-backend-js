const BlogCategory = require("../models/blog.category.model");

class BlogCategoryController {
  static create = async (req, res) => {
    try {
      const blogCategory = await BlogCategory.create(req.body);
      await blogCategory.save();
      return res.status(201).json(blogCategory);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Error creating category for this blog" });
    }
  };

  static findAll = async (req, res) => {
    try {
      const blogCategory = await BlogCategory.find();
      return res.status(200).json(blogCategory);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error to find all blog category" });
    }
  };

  static findOne = async (req, res) => {
    try {
      const { id } = req.params;
      const blogCategory = await BlogCategory.findById(id);
      if (!blogCategory) {
        return res
          .status(404)
          .json({ message: `Category with this id: ${id} not found` });
      }
      return res.status(200).json(blogCategory);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Blog with this Category not exists" });
    }
  };

  static update = async (req, res) => {
    try {
      const { id } = req.params;
      const blogCategory = await BlogCategory.findById(id);
      if (!blogCategory) {
        return res.status(404).json({
          message: `Blog with Category with this id: ${id} not found`,
        });
      }
      await BlogCategory.findByIdAndUpdate(id, req.body, { new: true });
      return res
        .status(200)
        .json({ message: "Blog with Category updated successfully." });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Blog with Category can not be updated" });
    }
  };
  static delete = async (req, res) => {
    try {
      const { id } = req.params;
      const blogCategory = await BlogCategory.findById(id);
      if (!blogCategory) {
        return res.status(404).json({
          message: `Blog with Category with this id: ${id} not found`,
        });
      }

      await BlogCategory.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "Category deleted successfully." });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Error while deleting this blog with category" });
    }
  };
}

module.exports = BlogCategoryController;
