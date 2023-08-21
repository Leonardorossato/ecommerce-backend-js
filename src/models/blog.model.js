const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, unique: true },
    numberOfViews: { type: Number, default: 0 },
    isLiked: { type: Boolean, default: false },
    isDisliked: { type: Boolean, default: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    deslikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    image: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fblog&psig=AOvVaw0oZU-45sFu7Easr37nz-i8&ust=1692639737776000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMCLrcTk64ADFQAAAAAdAAAAABAE",
    },
    author: { type: String, default: "Admin" },
  },
  { timestamps: true },
  { toObject: { virtuals: true } },
  { toJSON: { virtuals: true } }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
