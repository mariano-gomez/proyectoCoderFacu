const cartModel = require("./models/cart.model");
const mongoose = require("mongoose");

class CartManager {
  async getById(id) {
    return await cartModel.find({ _id: id });
  }

  async getByIdAndAddProduct({ id, productId, qty = 1 }) {
    const cart = await cartModel.find({ _id: mongoose.Types.ObjectId(id) });

    cart.products.forEach(async (p) => {
      if (p.productId === mongoose.Types.ObjectId(productId)) {
        p.qty += qty;
        await cart.save();
        return;
      }
    });

    cart.products.push({ productId, qty });
    return;
  }
}
