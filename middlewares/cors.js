var express = require('express');
var cors=require('cors');
var app = express();
function somMid(req,res,next){
 app.use(
     cors({
         origin:"*",
         method:["GET","POST","PUT","DELETE"]
     })
 );
 next();
}
module.exports=somMid;