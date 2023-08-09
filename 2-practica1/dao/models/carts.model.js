
const { Schema, model } = require("mongoose");

const schema = new Schema({
  products:{
    type:[{
      id: {type:Schema.Types.ObjectId, ref:"Product"},
      qty:{type:Number, default:0}
    }]
  },
  user:{type:Schema.Types.ObjectId,ref:"User"}
}, { timestamps: true });
