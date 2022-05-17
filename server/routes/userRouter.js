const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUser);
router.post("/", userController.changePassword);
router.put("/", userController.update);

module.exports = router;
