const { Schema, model } = require("mongoose");

const schema = new Schema({
  products:{
    type:[{
      product: {type:Schema.Types.ObjectId, ref:"products"},
      qty:{type:Number, default:0}
    }],
    default: []
  },
  user:{type:Schema.Types.ObjectId, ref:"users"}
}, { timestamps: true });

module.exports = model("carts", schema);