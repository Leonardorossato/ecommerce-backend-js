const Blog = require("../models/blog.model");
const cloudinaryUploadImg = require("../utils/cloudinary.utils");
const validateId = require("../utils/validate.utils");
const fs = require("fs");
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
      const blog = await Blog.findById(id)
        .populate("likes")
        .populate("deslikes");
      if (!blog) {
        return res
          .status(404)
          .json({ message: `Blog with id ${id} not found` });
      }
      await Blog.findByIdAndUpdate(
        id,
        { $inc: { numberOfViews: 1 } },
        { new: true }
      );
      return res.status(200).json(blog);
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

  static likeBlog = async (req, res) => {
    try {
      const { blogId } = req.body;
      validateId(blogId);
      const blog = await Blog.findById(blogId);
      let userId = req?.user?._id;
      let isLiked = blog?.isLiked;
      let alreadyDisliked = blog?.deslikes?.find(
        (userId) => userId.toString() === userId.toString()
      );
      if (alreadyDisliked) {
        const result = await Blog.findByIdAndUpdate(
          blogId,
          {
            $pull: { deslikes: userId },
            isDisliked: false,
          },
          { new: true }
        );
        return res.status(200).json(result);
      }
      if (isLiked) {
        const result = await Blog.findByIdAndUpdate(
          blogId,
          {
            $pull: { likes: userId },
            isLiked: false,
          },
          { new: true }
        );
        return res.status(200).json(result);
      } else {
        const result = await Blog.findByIdAndUpdate(
          blogId,
          {
            $push: { likes: userId },
            isLiked: true,
          },
          { new: true }
        );
        return res.status(200).json(result);
      }
    } catch (error) {
      return res.status(500).json({ message: "Error to like this blog" });
    }
  };

  static deslikeBlog = async (req, res) => {
    try {
      const { blogId } = req.body;
      validateId(blogId);
      const blog = await Blog.findById(blogId);
      let userId = req?.user?._id;
      let isDisliked = blog?.isDisliked;
      let alreadyDisliked = blog?.deslikes?.find(
        (userId) => userId.toString() === userId.toString()
      );
      if (alreadyDisliked) {
        const result = await Blog.findByIdAndUpdate(
          blogId,
          {
            $pull: { deslikes: userId },
            isDisliked: false,
          },
          { new: true }
        );
        return res.status(200).json(result);
      }
      if (isDisliked) {
        const result = await Blog.findByIdAndUpdate(
          blogId,
          {
            $pull: { likes: userId },
            isLiked: false,
          },
          { new: true }
        );
        return res.status(200).json(result);
      } else {
        const result = await Blog.findByIdAndUpdate(
          blogId,
          {
            $push: { deslikes: userId },
            isDisliked: true,
          },
          { new: true }
        );
        return res.status(200).json(result);
      }
    } catch (error) {
      return res.status(500).json({ message: "Error to like this blog" });
    }
  };

  static uploadBlogImages = async (req, res) => {
    try {
      const { id } = req.params;
      validateId(id);
      const upload = (path) => cloudinaryUploadImg(path, "images");
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await upload(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
      const blog = await Blog.findByIdAndUpdate(
        id,
        {
          images: urls.map((file) => {
            return file;
          }),
        },
        { new: true }
      );
      return res.status(200).json(blog);
    } catch (error) {
      return res.status(400).json({ message: "Error in upload this image" });
    }
  };
}

module.exports = BlogController;
