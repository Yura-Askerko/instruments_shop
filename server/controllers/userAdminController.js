const { User, Basket, Role } = require("../models/models");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");

const existByLoginAndEmail = async (login, email) => {
  let user = await User.findOne({ where: { login } });
  console.log(user);
  if (user !== null) {
    return true;
  }

  user = await User.findOne({ where: { email } });
  console.log(user);
  if (user !== null) {
    return true;
  }
  return false;
};

class UserAdminController {
  async create(req, res, next) {
    const { login, password, fullName, phone, email, roleId } = req.body;
    if (!login || !password || !fullName || !phone || !email || !roleId) {
      return next(ApiError.badRequest("Не все поля заполнены"));
    }

    const findByLogin = await User.findOne({ where: { login } });
    const findByEmail = await User.findOne({ where: { email } });
    const findByPhone = await User.findOne({ where: { phone } });
    if (findByLogin || findByEmail || findByPhone) {
      return next(
        ApiError.badRequest("Пользователь с такими данными уже существует")
      );
    } else {
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        login,
        password: hashPassword,
        fullName,
        phone,
        email,
        roleId,
      });
      const role = await Role.findOne({ where: { id: roleId } });
      if (role.name === "user") {
        const basket = await Basket.create({ userId: user.id });
      }
      return res.json(user);
    }
  }

  async getAll(req, res, next) {
    const users = await User.findAll({ include: { model: Role } });
    return res.json(users);
  }

  async delete(req, res, next) {
    const id = req.params.id;
    const user = await User.destroy({ where: { id } });
  }
}

module.exports = new UserAdminController();
