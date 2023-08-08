const productModel = require("./models/product.model");
//const db = require("../config/connection.mongo");
class ProductManager {
  async addProduct(product) {
    return await productModel.create(product);
  }

  async getAll({limit=undefined,page=1}) {
    console.log(limit,page)
    if(!limit){
      return await productModel.find({})
    }else {
      return await productModel.find({}).limit(limit).skip((page-1)*limit)
    }
    
  }

  async getById(id) {
    return await productModel.findOne({ _id: id });
  }

  async updateById(id, productUpdated) {
    return await productModel.findOneAndUpdate(id, productUpdated);
  }

  async deleteById(id) {
    return await productModel.deleteOne({ _id: id });
  }
}

const p = {
  title: "producto 1",
  description: "la descripcion del producto1",
  price: 50,
  stock: 10,
  category: "juguete",
  status: true,
  thumbnails: ["path/img1.jpg", "path/img2.jpg"],
};

module.exports = new ProductManager(); //singleton --> siempre exporto una misma instancia de clase.
