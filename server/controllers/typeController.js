const { Type } = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController {
  async create(req, res, next) {
    const { name } = req.body;
    const potential = await Type.findOne({ where: { name } });
    if (potential) {
      return next(ApiError.badRequest("Type already exists"));
    }
    const type = await Type.create({ name });
    return res.json(type);
  }

  async getAll(req, res, next) {
    const types = await Type.findAll();
    return res.json(types);
  }

  async update(req, res, next) {
    const id = req.params.id;
    const { name } = req.body;
    const type = await Type.findOne({ where: { id } });
    if (!type) {
      return next(ApiError.badRequest("Type not found"));
    }

    const potential = await Type.findOne({ where: { name } });
    if (potential) {
      return next(ApiError.badRequest("Type already exists"));
    }

    type.name = name;
    await type.save();
    return res.json(type);
  }

  async delete(req, res, next) {
    const id = req.params.id;
    const type = await Type.destroy({ where: { id } });
    if (!type) {
      return next(ApiError.badRequest("Type not found"));
    }
    return res.json(type);
  }
}

module.exports = new TypeController();
