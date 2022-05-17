const { Product, Basket, BasketProduct } = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController {
  async addToBasket(req, res, next) {
    const { id } = req.user;
    const { productId, count } = req.body;

    const userBasket = await Basket.findOne({
      where: { userId: id },
      order: [["id", "DESC"]],
    });
    // check if userBasket contains productId
    const basketProduct = await BasketProduct.findOne({
      where: { productId, basketId: userBasket.id },
    });

    if (basketProduct) {
      next(ApiError.badRequest("Product already in basket"));
    } else {
      // create new basketProduct
      const basket = await BasketProduct.create({
        productId,
        basketId: userBasket.id,
        count,
      });
      return res.json({ basket });
    }
  }

  async getBasketUser(req, res, next) {
    const { id } = req.user;

    const userBasket = await Basket.findOne({
      where: { userId: id },
      order: [["id", "DESC"]],
    });

    const basket = await BasketProduct.findAll({
      include: [{ model: Product }, { model: Basket }],
      where: { basketId: userBasket.id },
    });
    return res.json({ basket });
  }

  async updateUserBasketProduct(req, res, next) {
    const { id } = req.user;

    const userBasket = await Basket.findOne({
      where: { userId: id },
      order: [["id", "DESC"]],
    });

    const { productId, count } = req.body;
    const basket = await BasketProduct.update(
      { count },
      { where: [{ basketId: userBasket.id }, { productId }] }
    );
    return res.json({ basket });
  }

  async deleteFromBasket(req, res, next) {
    const { id } = req.user;
    const { productId } = req.body;
    const userBasket = await Basket.findOne({
      where: { userId: id },
      order: [["id", "DESC"]],
    });
    const basket = await BasketProduct.destroy({
      where: { productId, basketId: userBasket.id },
    });
    return res.json({ basket });
  }
}

module.exports = new BasketController();
