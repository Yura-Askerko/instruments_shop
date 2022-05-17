const Router = require("express");
const router = new Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getAll);
router.delete("/:id", categoryController.delete);
router.post("/", categoryController.create);
router.put("/:id", categoryController.update);

module.exports = router;
