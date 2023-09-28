const { Schema, model } = require('mongoose')

const schema = new Schema({
user: {type: String, default: "unLoguedUser"},
message: {type:String, default: ""}
},{
  timestamps:true
})


module.exports = model("Message",schema)