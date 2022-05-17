const { User, Basket, Role } = require("../models/models");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");

const existByLoginAndEmail = async (login, email) => {
  let user = await User.findOne({ where: { login } });
  if (user) {
    return next(
      ApiError.badRequest("Пользователь с таким логином уже существует")
    );
  }

  user = await User.findOne({ where: { email } });
  if (user) {
    return next(
      ApiError.badRequest("Пользователь с таким email уже существует")
    );
  }
  return false;
};

class UserController {
  async changePassword(req, res, next) {
    const { id } = req.user;
    const { password } = req.body;
    if (!id || !password) {
      return next(ApiError.badRequest("Не все поля заполнены"));
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.update(
      { password: hashPassword },
      { where: { id } }
    );
    return res.json({ user });
  }

  async getUser(req, res, next) {
    const { id } = req.user;
    if (!id) {
      return next(ApiError.badRequest("Не все поля заполнены"));
    }

    const user = await User.findOne({ where: { id } });
    return res.json({ user });
  }

  async update(req, res, next) {
    const { id } = req.user;
    const { login, fullName, phone, email, roleId } = req.body;
    if (!login || !fullName || !phone || !email || !roleId) {
      return next(ApiError.badRequest("Не все поля заполнены"));
    }

    if (!existByLoginAndEmail(login, email)) {
      const user = await User.update(
        { login, fullName, phone, email, roleId },
        { where: { id } }
      );
      return res.json({ user });
    }
  }
}

module.exports = new UserController();
