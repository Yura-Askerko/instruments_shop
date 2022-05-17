const Router = require("express");
const router = new Router();
const roleController = require("../controllers/roleController");

router.get("/", roleController.getAll);
router.post("/", roleController.create);
router.delete("/:id", roleController.delete);

module.exports = router;
