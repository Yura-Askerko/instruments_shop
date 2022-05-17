const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/", checkRole("admin", "manager"), orderController.getAll);
router.post("/", checkRole("user"), orderController.create);
router.get("/byDates", checkRole("admin"), orderController.getByDates);

module.exports = router;
