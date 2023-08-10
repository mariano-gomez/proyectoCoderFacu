const cartModel = require("./models/cart.model");
const mongoose = require("mongoose");

class CartManager {

  async createCart({userId}){
    console.log("pacuno el userId: ",userId)
    await cartModel.create({user: new mongoose.Types.ObjectId(userId)})
  }

  async getById(id) {
    return await cartModel.findById(id)
  }

  async getByIdAndAddProduct({ id, productId, qty = 1 }) {
    const cart = await cartModel.find({ _id: new mongoose.Types.ObjectId(id) });

    cart.products.forEach(async (p) => {
      if (p.productId === new mongoose.Types.ObjectId(productId)) {
        p.qty += qty;
        await cart.save();
        return;
      }
    });

    cart.products.push({ productId, qty });
    return;
  }
}

module.exports = new CartManager()