const ProductModel = require('../models/product');

const Query = {
  hello: () => 'Hello World!',
  listProducts: async (_, { limit, page }) => {
    return ProductModel.find({})
      .skip((page - 1) * limit)
      .limit(limit);
  },
};

const Mutation = {
  addProduct: async (_, args) => {
    const product = new ProductModel(args);
    return product.save();
  },
};

module.exports = {
  Query,
  Mutation,
};
