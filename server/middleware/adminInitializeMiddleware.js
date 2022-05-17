const { User, Role } = require("../models/models");
const bcrypt = require("bcrypt");

module.exports = async () => {
  const user = await User.findOne({
    where: { login: "admin" },
  });
  if (!user) {
    const password = await bcrypt.hash("password", 5);
    const adminRole = await Role.findOne({ where: { name: "admin" } });
    User.create({
      login: "admin",
      password: password,
      fullName: "admin",
      email: "admin@gmail.com",
      phone: "number",
      roleId: adminRole.id,
    });
  }
};
