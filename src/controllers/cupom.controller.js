const Cupom = require("../models/cupom.model");

class CupomController {
  static findAll = async (req, res) => {
    try {
      const cupom = await Cupom.find();
      return res.status(200).json(cupom);
    } catch (error) {
      return res.status(500).json({ message: "Error to find all cupons" });
    }
  };

  static create = async (req, res) => {
    try {
      const cupom = await Cupom.create(req.body);
      await cupom.save();
      return res.status(200).json(cupom);
    } catch (error) {
      return res.status(400).json({ message: "Error creating cupom" });
    }
  };

  static findOne = async (req, res) => {
    try {
      const { id } = req.params;
      const cupom = await Cupom.findById(id);
      if (!cupom) {
        return res
          .status(404)
          .json({ message: `Cupom with this ${id} not found` });
      }
      return res.status(200).json(cupom);
    } catch (error) {
      return res.status(400).json({ message: "Cupom not exists" });
    }
  };

  static update = async (req, res) => {
    try {
      const { id } = req.params;
      const cupom = await Cupom.findById(id);
      if (!cupom) {
        return res
          .status(404)
          .json({ message: `Cupom with this ${id} not found` });
      }
      await Cupom.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({ message: "Cupom update successfully." });
    } catch (error) {
      return res.status(404).json({ message: "Error updating this cupom" });
    }
  };

  static delete = async (req, res) => {
    try {
      const { id } = req.params;
      const cupom = await Cupom.findById(id);
      if (!cupom) {
        return res
          .status(404)
          .json({ message: `Cupom with this ${id} not found` });
      }
      await Cupom.findByIdAndDelete(id);
      return res.status(200).json({ message: "Cupom deleted successfully" });
    } catch (error) {
      return res.status(404).json({ message: " Error deleting cupom" });
    }
  };
}

module.exports = CupomController;
