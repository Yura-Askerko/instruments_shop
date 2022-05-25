const {
  Order,
  Basket,
  Product,
  BasketProduct,
  User,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");
const { parseISO } = require("date-fns");

class OrderController {
  async create(req, res, next) {
    const { id } = req.user;

    const userBasket = await Basket.findOne({
      where: { userId: id },
      order: [["id", "DESC"]],
    });

    const potential = await Order.findOne({
      where: { basketId: userBasket.id },
    });

    if (potential) {
      return next(ApiError.badRequest("Order with this basket already exists"));
    }

    const basket = await BasketProduct.findAll({
      include: [{ model: Product }, { model: Basket }],
      where: { basketId: userBasket.id },
    });

    const cost = basket.reduce((acc, item) => {
      console.log(item);
      return acc + item.count * item.product.price;
    }, 0);

    const order = await Order.create({
      basketId: userBasket.id,
      cost,
      date: Date.now(),
    });

    const newBasket = await Basket.create({ userId: id });

    return res.json(order);
  }

  async getPage(req, res, next) {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 10;
    let offset = (page - 1) * limit;

    const orders = await Order.findAndCountAll(
      {
        include: {
          model: Basket,
          include: {
            model: BasketProduct,
            include: {
              model: Product,
            },
          },
        },
      },
      { where: limit, offset }
    );
    return res.json(orders);
  }

  async getAll(req, res, next) {
    const orders = await Order.findAll({
      include: {
        model: Basket,
        include: [
          {
            model: BasketProduct,
            include: {
              model: Product,
            },
          },
          { model: User },
        ],
      },
    });
    return res.json(orders);
  }

  async getByDates(req, res, next) {
    const { startDate, endDate } = req.query;
    console.log(parseISO(startDate), parseISO(endDate));
    const orders = await Order.findAll({
      where: {
        date: { [Op.between]: [parseISO(startDate), parseISO(endDate)] },
      },
      include: {
        model: Basket,
        include: [
          {
            model: BasketProduct,
            include: {
              model: Product,
            },
          },
          { model: User },
        ],
      },
    });
    return res.json(orders);
  }
}

module.exports = new OrderController();
