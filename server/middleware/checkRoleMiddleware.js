const jwt = require("jsonwebtoken");
const { Role } = require("../models/models");
const ApiError = require("../error/apiError");

module.exports = (...roles) => {
  return async (req, res, next) => {
    if (req.method === "OPTIONS") {
      return next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Неверный токен" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) {
        return res.status(401).json({ message: "Неверный токен" });
      }

      const userRole = await Role.findByPk(decoded.roleId);

      console.log(userRole);

      if (roles.includes(userRole.dataValues.name)) {
        req.user = decoded;
        next();
      } else {
        return res.status(403).json({ message: "Нет прав доступа" });
      }
    } catch (e) {
      res.status(401).json({ message: "Неверный токен" });
    }
  };
};
