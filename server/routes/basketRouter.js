const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");
const checkAuth = require("../middleware/authMiddleware");

router.get("/", basketController.getBasketUser);
router.post("/", basketController.addToBasket);
router.delete("/:productId", basketController.deleteFromBasket);
router.put("/", basketController.updateUserBasketProduct);

module.exports = router;
