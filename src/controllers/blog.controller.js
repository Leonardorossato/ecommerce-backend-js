const Blog = require("../models/blog.model");

class BlogController {
  static create = async (req, res) => {
    try {
      const blog = await Blog.create(req.body);
      await blog.save();
      return res.status(201).json(blog);
    } catch (error) {
      return res.status(400).json({ message: "Error creating blog." });
    }
  };

  static findAll = async (req, res) => {
    try {
      const blog = await Blog.find();
      return res.status(200).json(blog);
    } catch (error) {
      return res.status(500).json({ message: "Error to find all blogs." });
    }
  };

  static getByNumbersOfViews = async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findById(id);
      if (!blog) {
        return res
          .status(404)
          .json({ message: `Blog with id ${id} not found` });
      }
      const views = await Blog.findByIdAndUpdate(
        id,
        { $inc: { numberOfViews: 1 } },
        { new: true }
      );
      return res.status(200).json(blog, views);
    } catch (error) {
      return res
        .status(400)
        .json({ message: `This blog has a error: ${error.message}` });
    }
  };

  static update = async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findById(id);
      if (!blog) {
        return res
          .status(404)
          .json({ message: `Blog with id ${id} not found` });
      }
      await Blog.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({ message: "Blog updated successfully." });
    } catch (error) {
      return res.status(500).json({ message: "Error updating this blog." });
    }
  };

  static delete = async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findById(id);
      if (!blog) {
        return res
          .status(404)
          .json({ message: `Blog with id ${id} not found` });
      }
      await Blog.findByIdAndDelete(id);
      return res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error while deleting blog" });
    }
  };
}

module.exports = BlogController;
