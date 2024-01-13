import express from 'express';
import { ProductController } from '../controller/product.controller.js';

const productRouter=express.Router();

 const productController=new ProductController();
productRouter.post('/create',(req,res,next)=>{
productController.createProduct(req,res,next);
})
productRouter.get("/get-all",(req,res,next)=>{
    productController.getAllProduct(req,res,next);
})
productRouter.delete("/:id",(req,res,next)=>{
    productController.deleteProduct(req,res,next);
})
productRouter.post("/:id/update_quantity/",(req,res,next)=>{
    productController.updateProduct(req,res,next);
})


export default productRouter;