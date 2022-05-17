const { Role } = require("../models/models");
const ApiError = require("../error/ApiError");

class RoleController {
  async create(req, res, next) {
    const { name } = req.body;
    const potential = await Role.findOne({ where: { name } });
    if (potential) {
      return next(ApiError.badRequest("Role already exists"));
    }
    const role = await Role.create({ name });
    return res.json(role);
  }

  async getAll(req, res, next) {
    const roles = await Role.findAll();
    return res.json(roles);
  }

  async delete(req, res, next) {
    const id = req.params.id;
    const role = await Role.destroy({ where: { id } });
    if (!role) {
      return next(ApiError.badRequest("Product not found"));
    }
    return res.json(role);
  }
}

module.exports = new RoleController();
