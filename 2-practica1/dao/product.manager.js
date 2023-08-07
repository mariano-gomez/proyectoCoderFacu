const productModel = require("./models/product.model");
const db = require("../config/connection.mongo");


class ProductManager {
  createProduct({
    title,
    description,
    price,
    stock,
    category,
    status,
    thumbnails,
  }) {
    productModel.create({
      title,
      description,
      price,
      stock,
      category,
      status,
      thumbnails,
    });
  }
}


const p = {
  title:"producto 1",
  description: "la descripcion del producto1",
  price: 50,
  stock: 10,
  category:"juguete",
  status: true,
  thumbnails:["path/img1.jpg","path/img2.jpg"],
}

const PM = new ProductManager()

PM.createProduct(p)