const app = require("../app");

function somMid(req,res,next){
 app.use(
     cors({
         origin:"*",
         method:["GET","POST","PUT","DELETE"]
     })
 )
}