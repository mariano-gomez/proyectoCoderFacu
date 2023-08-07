const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: { type: String, required: true },
    status: { type: Boolean, default: true },
    thumbnails: {
      type: [
        {
          type: String,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const productModel = model("Product", schema);
module.exports = productModel;
