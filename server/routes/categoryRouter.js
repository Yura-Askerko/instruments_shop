const Router = require("express");
const router = new Router();
const categoryController = require("../controllers/categoryController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/", categoryController.getAll);
router.delete("/:id", checkRole("admin", "manager"), categoryController.delete);
router.post("/", checkRole("admin", "manager"), categoryController.create);
router.put("/:id", checkRole("admin", "manager"), categoryController.update);

module.exports = router;
