const Router = require("express");
const router = new Router();
const basketRouter = require("./basketRouter");
const productRouter = require("./productRouter");
const userAdminRouter = require("./userAdminRouter");
const categoryRouter = require("./categoryRouter");
const orderRouter = require("./orderRouter");
const roleRouter = require("./roleRouter");
const deliveryRouter = require("./deliveryRouter");
const typeRouter = require("./typeRouter");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const checkRole = require("../middleware/checkRoleMiddleware");
const checkAuth = require("../middleware/authMiddleware");

router.use("/admin/user", checkRole("admin"), userAdminRouter);
router.use("/role", checkRole("admin"), roleRouter);
router.use("/category", checkRole("admin", "manager"), categoryRouter);
router.use("/type", checkRole("admin", "manager"), typeRouter);
router.use("/order", checkAuth, orderRouter);
router.use("/product", checkAuth, productRouter);
router.use("/delivery", checkAuth, deliveryRouter);
router.use("/basket", checkRole("user"), checkAuth, basketRouter);
router.use("/auth", authRouter);
router.use("/user", checkAuth, userRouter);

module.exports = router;
