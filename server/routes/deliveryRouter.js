const Router = require("express");
const router = new Router();
const deliveryController = require("../controllers/deliveryController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/", checkRole("admin", "manager"), deliveryController.getAll);
router.get("/:userId", deliveryController.getUserDelivery);
router.post("/", deliveryController.create);

module.exports = router;
