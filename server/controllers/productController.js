const uuid = require("uuid");
const path = require("path");
const { Product, Type, Category } = require("../models/models");
const ApiError = require("../error/ApiError");

class ProductController {
  async create(req, res, next) {
    try {
      const { name, article, price, description, typeId, categoryId } =
        req.body;
      const { photo } = req.files;
      let fileName = uuid.v4() + ".jpg";
      photo.mv(path.resolve(__dirname, "../static/" + fileName));

      let potential = await Product.findOne({ where: { name } });
      if (potential) {
        return next(
          ApiError.badRequest("Product with this name already exists")
        );
      }
      potential = await Product.findOne({ where: { article } });
      if (potential) {
        return next(
          ApiError.badRequest("Product with this article already exists")
        );
      }

      const product = await Product.create({
        name,
        article,
        price,
        description,
        typeId,
        categoryId,
        photo: fileName,
      });
      return res.json(product);
    } catch (e) {
      next(new ApiError(e.message));
    }
  }

  async update(req, res, next) {
    console.log(req.files, req.body);
    try {
      const { name, article, price, description, typeId, categoryId } =
        req.body;
      const { photo } = req.files;

      const product = await Product.findOne({ where: { id: req.params.id } });
      product.name = name;
      product.article = article;
      product.price = price;
      product.description = description;
      product.typeId = typeId;
      product.categoryId = categoryId;

      if (photo) {
        let fileName = uuid.v4() + ".jpg";
        photo.mv(path.resolve(__dirname, "../static/" + fileName));
        product.photo = fileName;
      }

      await product.save();
      return res.json(product);
    } catch (e) {
      next(new ApiError(e.message));
    }
  }

  async getAll(req, res, next) {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Type }],
    });
    // products.map((product) => {
    //   return {...product, type: await Type.findOne({ where: { id: product.typeId } }), category: await Category.findOne({ where: { id: product.categoryId } })};
    // });
    return res.json(products);
  }

  async getPage(req, res, next) {
    let { typeId, categoryId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 10;
    let offset = (page - 1) * limit;
    let products;
    if (!typeId && !categoryId) {
      products = await Product.findAndCountAll(
        { include: [{ model: Category }, { model: Type }] },
        { where: limit, offset }
      );
    }
    if (typeId && !categoryId) {
      products = await Product.findAndCountAll(
        { include: [{ model: Category }, { model: Type }] },
        { where: { typeId }, limit, offset }
      );
    }
    if (!typeId && categoryId) {
      products = await Product.findAndCountAll(
        { include: [{ model: Category }, { model: Type }] },
        { where: { categoryId }, limit, offset }
      );
    }
    if (typeId && categoryId) {
      products = await Product.findAndCountAll({
        include: {
          model: Type,
          model: Category,
        },
        where: { typeId, categoryId },
        limit,
        offset,
      });
    }

    // const basket = await BasketProduct.findAll({include: {
    //     model: Product
    // }, where: { basketId: id } });

    return res.json(products);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const product = await Product.findOne(
      { include: [{ model: Type }, { model: Category }] },
      { where: { id } }
    );
    if (!product) {
      return next(ApiError.badRequest("Product not found"));
    }
    return res.json(product);
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const product = await Product.destroy({ where: { id } });
    if (!product) {
      return next(ApiError.badRequest("Product not found"));
    }
    return res.json(product);
  }
}

module.exports = new ProductController();
