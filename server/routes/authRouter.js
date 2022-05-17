const Router = require("express");
const router = new Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/", authMiddleware, authController.check);

module.exports = router;
