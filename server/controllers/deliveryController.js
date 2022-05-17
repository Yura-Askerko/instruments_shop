const { Delivery, Order, Basket, BasketProduct } = require("../models/models");
const ApiError = require("../error/ApiError");

class DeliveryController {
  async create(req, res, next) {
    const { address, price, orderId } = req.body;
    const delivery = await Delivery.create({
      address,
      price,
      orderId,
    });
    return res.json({ delivery });
  }

  async getAll(req, res, next) {
    const deliveries = await Delivery.findAll();
    return res.json(deliveries);
  }

  async getUserDelivery(req, res, next) {
    const userId = req.params.userId;

    if (userId !== req.user.id) {
      return next(
        ApiError.badRequest("You don't have access to this delivery")
      );
    }

    const delivery = await Delivery.findAll({
      include: {
        model: Order,
        include: { model: Basket, where: { userId } },
      },
    });
    return res.json({ delivery });
  }
}

module.exports = new DeliveryController();
