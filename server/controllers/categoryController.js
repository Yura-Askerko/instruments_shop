const { Category } = require("../models/models");
const ApiError = require("../error/ApiError");

class CategoryController {
  async create(req, res, next) {
    const { name } = req.body;
    const potential = await Category.findOne({ where: { name } });
    if (potential) {
      next(ApiError.badRequest("Category already exists"));
    }
    const category = await Category.create({ name });
    return res.json(category);
  }

  async update(req, res, next) {
    const id = req.params.id;
    const { name } = req.body;
    const cat = await Category.findOne({ where: { id } });
    if (!cat) {
      return next(ApiError.badRequest("Category not found"));
    }

    const potential = await Category.findOne({ where: { name } });
    if (potential) {
      return next(ApiError.badRequest("Category already exists"));
    }

    cat.name = name;
    await cat.save();
    return res.json(cat);
  }

  async getAll(req, res, next) {
    const categories = await Category.findAll();
    return res.json(categories);
  }

  async delete(req, res, next) {
    const id = req.params.id;
    const category = await Category.destroy({ where: { id } });
    if (!category) {
      next(ApiError.badRequest("Category not found"));
    }
    return res.json(category);
  }
}

module.exports = new CategoryController();
