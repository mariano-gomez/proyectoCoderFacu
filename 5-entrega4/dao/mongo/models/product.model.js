const { Schema, model } = require("mongoose");
const { v4: uuid } = require("uuid");
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    owner: { type: String, default: "admin" },
    code: { type: String, unique: true, default: uuid },
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

schema.plugin(mongoosePaginate);


const productModel = model("products", schema);
module.exports = productModel;
//Nota en el code, el valor por default tiene qus eser uudi, para pasar la funcion, de esta manera  mongoose la ejecutara para cada documento que necesite usar el default.
//si le asigno uuid(), le estoy diciendo al esquema que el valor por defecto es el valor retornado por uuid() cuando crea el esquema.. es decir todos van a tener un mismo codigo uuid por defecto, esto esta mal. 