import express, { application } from 'express';
import swagger from 'swagger-ui-express';
import cors from 'cors';
import './env.config.js';
import userRouter from './src/users/routes/user.routes.js';
import { ApplicationError } from './src/error-handler/Application.error-hanlder.js';
import jwtMiddleware from './src/middlewares/jwt.middleware.js';
import connectionUsingMongooseToMongoDB from './dbConfig/db.config.js';
import productRouter from './src/features/products/routes/product.routes.js';
import  apiDocs from './swagger.json' assert {type:'json'};


const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
var corsOption={
  origin:'*',
  methods:['GET','POST','PUT','DELETE','PATCH'],
  allowedHeaders:['Content-Type','Authorization']
}
app.use(cors(corsOption));
//swagger docs configuration

app.use("/api-docs",swagger.serve,swagger.setup(apiDocs));

app.get("/",(req,res,next)=>{
  res.redirect("/api-docs");
})
app.use("/api/users",userRouter);
app.use("/api/products",jwtMiddleware,productRouter);


// express default error-handler middleware for handling errors
app.use((err, req, res, next) => {
  if(err instanceof  ApplicationError){
    return res.status(err.statusCode).send(err.message);
  }
    
    res.status(500).send('Something went wrong!')
  })


//404 handling for invalid routes

app.use((req,res)=>{
  res.status(404).send("Api not found ..Not a valid url path. To see our documentation of api please Go To: "+"localhost:3200/api-docs");
})

//listening server on port 3200
app.listen(3200,(req,res)=>{
  
console.log("server is listening at port 3200");
connectionUsingMongooseToMongoDB();

})