
const { Schema, model } = require("mongoose");

const schema = new Schema({
  products:{
    type:[{
      pid: {type:Schema.Types.ObjectId, ref:"Product"},
      qty:{type:Number, default:0}
    }]
  },
  user:{type:Schema.Types.ObjectId,ref:"User"}
}, { timestamps: true });

module.exports = model("Cart", schema);