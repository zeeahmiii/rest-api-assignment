//const { validate } = require("@hapi/joi/lib/base");
const express = require("express");
let router = express.Router();
const validateProduct=require("../../middlewares/validateProduct")
var{ Product } = require("../../models/product")

//get products

router.get("/", async(req,res)=>{
    let page=Number(req.query.page ? req.query.page : 1);
    let perpage=Number(req.query.perpage ? req.query.perpage :10);
        let skip=(perpage*(page-1))
    let products=await Product.find().skip(skip).limit(perpage);
    return res.send(products)
})

//get single products
router.get("/:id", async(req,res)=>{
    try{
    let product=await Product.findById(req.params.id);
    if(!product)
     return res.status(400).send("product with the given ID is not Present")
    return res.send(product)
    }
    catch(err){
      return res.status(400).send("Invalid ID")  
    }
})

//UPDATE A RECORD
router.put("/:id",validateProduct,async(req,res)=>{
    let product=await Product.findById(req.params.id);
    product.Name=req.body.Name;
    product.Description=req.body.Description;
    product.Price=req.body.Price;
    product.Color=req.body.Color;
    product.Category=req.body.Category;
    await product.save();
    return res.send(product);
} )

//Delete a record
router.delete("/:id",async(req,res)=>{
    let product=await Product.findByIdAndDelete(req.params.id);
    return res.send(product);
} )

//Add a record

router.post("/",validateProduct, async (req,res) => {
    
    let product = new Product();
    product.Name = req.body.Name;
    product.Description = req.body.Description;
    product.Price = req.body.Price;
    product.Color = req.body.Color;
    product.Category = req.body.Category;
    await product.save();
    return res.send(product);
}); 

module.exports=router;