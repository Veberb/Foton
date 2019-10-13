const { ProductModel } = require('../models');
const { authenticated } = require('../middleware/authHelper');

const Query = {
  listProducts: authenticated(
    (parent, { listQuery: { limit = 10, page = 1, search } }) => {
      const query = {};
      if (search) query.name = { $regex: search, $options: 'i' };

      return ProductModel.find(query)
        .skip((page - 1) * limit)
        .limit(limit);
    }
  ),
  getProduct: authenticated((parent, { id }) => {
    return ProductModel.findById(id);
  }),
};

const Mutation = {
  addProduct: authenticated((parent, args) => {
    const product = new ProductModel(args);
    return product.save();
  }),
  updateProduct: authenticated(
    (parent, { id, name, description, quantity, status }) => {
      const $set = {};
      if (name) $set.name = name;
      if (description) $set.description = description;
      if (quantity) $set.quantity = quantity;
      if (status) $set.status = status;

      return ProductModel.findByIdAndUpdate(id, { $set }, { new: true });
    }
  ),
};

module.exports = {
  Query,
  Mutation,
};
