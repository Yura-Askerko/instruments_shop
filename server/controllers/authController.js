const ApiError = require("../error/ApiError");
const { User, Basket, Role } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, login, roleId) => {
  const token = jwt.sign({ id, login, roleId }, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });
  return token;
};

class AuthController {
  async signup(req, res, next) {
    const { login, password, fullName, phone, email } = req.body;
    if (!login || !password || !fullName || !phone || !email) {
      return next(ApiError.badRequest("Не все поля заполнены"));
    }

    //check if exist user with login or email
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

    const hashPassword = await bcrypt.hash(password, 5);
    const userRole = await Role.findOne({ where: { name: "user" } });
    user = await User.create({
      login,
      password: hashPassword,
      fullName,
      phone,
      email,
      roleId: userRole.id,
    });

    await Basket.create({ userId: user.id });
    return res.json({ user });
  }

  async signin(req, res, next) {
    const { login, password } = req.body;
    if (!login || !password) {
      return next(ApiError.badRequest("Не все поля заполнены"));
    }

    const user = await User.findOne({ where: { login } });
    if (!user) {
      return next(
        ApiError.badRequest("Пользователь с таким логином не найден")
      );
    }

    console.log(!user);

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      next(ApiError.unauthorized("Неверный пароль"));
    } else {
      const token = generateJwt(
        user.dataValues.id,
        user.dataValues.login,
        user.dataValues.roleId
      );
      const userRole = await Role.findOne({
        where: { id: user.dataValues.roleId },
      });
      console.log(userRole.name);
      return res.json({
        token,
        id: user.id,
        login: user.login,
        isAdmin: userRole.name === "admin",
      });
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.login, req.user.roleId);
    return res.json({ token });
  }
}

module.exports = new AuthController();
