const Router = require("express");
const router = new Router();
const userAdminController = require("../controllers/userAdminController");

router.get("/", userAdminController.getAll);
router.post("/", userAdminController.create);
router.delete("/:id", userAdminController.delete);

module.exports = router;
