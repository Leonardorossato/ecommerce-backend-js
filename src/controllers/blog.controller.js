const Blog = require("../models/blog.mode");

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
}

module.exports = BlogController;
