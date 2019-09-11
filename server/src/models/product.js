const mongoose = require('mongoose');
const Enum = require('../util/enum/Enum');

exports.productStatus = new Enum(['ACTIVE', 'INACTIVE', 'DELETED']);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    status: {
      type: String,
      enum: this.productStatus.list(),
      default: this.productStatus.ACTIVE,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
