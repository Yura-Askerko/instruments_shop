const Router = require("express");
const router = new Router();
const productController = require("../controllers/productController");
const checkRole = require("../middleware/checkRoleMiddleware");
const checkAuth = require("../middleware/authMiddleware");

router.get("/", productController.getAll);
router.get("/page", checkAuth, productController.getPage);
router.post("/", checkRole("admin", "manager"), productController.create);
router.get("/:id", checkAuth, productController.getOne);
router.put("/:id", checkAuth, productController.update);
router.delete("/:id", checkRole("admin", "manager"), productController.delete);

module.exports = router;
