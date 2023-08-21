const Brand = require("../models/brand.model");

class BrandController {
  static create = async (req, res) => {
    try {
      const brand = await Brand.create(req.body);
      await brand.save();
      return res.status(201).json(brand);
    } catch (error) {
      return res.status(400).json({ message: "Error creating brand" });
    }
  };

  static findAll = async (req, res) => {
    try {
      const brand = await Brand.find();
      return res.status(200).json(brand);
    } catch (error) {
      return res.status(500).json({ message: "Error to find all brands" });
    }
  };

  static findOne = async (req, res) => {
    try {
      const { id } = req.params;
      const brand = await Brand.findById(id);
      if (!brand) {
        return res
          .status(404)
          .json({ message: `Brand with this id: ${id} not found` });
      }
      return res.status(200).json(brand);
    } catch (error) {
      return res.status(400).json({ message: "Brand not exists" });
    }
  };

  static update = async (req, res) => {
    try {
      const { id } = req.params;
      const brand = await Brand.findById(id);
      if (!brand) {
        return res
          .status(404)
          .json({ message: `Brand with this id: ${id} not found` });
      }
      await Brand.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({ message: "Brand updated successfully." });
    } catch (error) {
      return res.status(400).json({ message: "Brand can not be updated" });
    }
  };
  static delete = async (req, res) => {
    try {
      const { id } = req.params;
      const brand = await Brand.findById(id);
      if (!brand) {
        return res
          .status(404)
          .json({ message: `Brand with this id: ${id} not found` });
      }

      await Brand.findByIdAndDelete(id);
      return res.status(200).json({ message: "Brand deleted successfully." });
    } catch (error) {
      return res.status(400).json({ message: "Error while deleting brand" });
    }
  };
}

module.exports = BrandController;
