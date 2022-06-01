var mongoose=require("mongoose");
const joi = require("@hapi/joi");
var productSchema=mongoose.Schema({
    Name:String,
    Description:String,
    Price:Number,
    Color:String,
    Category:String,
})

var Product = mongoose.model("Product",productSchema);

function validateProduct(data){
    const schema = joi.object({
        Name: joi.string().min(3).max(15).required(),
        Description:joi.string().min(3).max(100).required(),
        Price:joi.number().min(0).required(),
        Color:joi.string().min(3).max(15).required(),
        Category:joi.string().min(3).max(15).required(),

    });
    return schema.validate(data,{abortEarly:false});
}

module.exports.Product=Product;
module.exports.validate=validateProduct;