import { ProductRepository } from "../repository/product.repository.js";

export class ProductController{
    constructor(){
        this.productRepository=new ProductRepository();
    }
    async createProduct(req,res,next){
        try{
            const {name,quantity}=req.body;
            const result=await this.productRepository.createProduct(name,Number(quantity));
            if(result.success){
                return res.status(201).send(result.data);
            }
            else{
                return res.status(400).send(result.message);
            }

        }
        catch(error){
            console.log(error);
            next(error);
        }
    }
    async getAllProduct(req,res,next){
        try{
            const result=await this.productRepository.getAllProduct();
            if(result.success){
                return res.status(200).send(result.data);
            }
            else{
                return res.status(400).send(result.message);
            }

        }
        catch(error){

            console.log(error);
            next(error);
        }
    }
    async deleteProduct(req,res,next){
        try{
            const id=req.params.id;
            const result=await this.productRepository.deleteProduct(id);
            if(result.success){
                return res.status(200).send(result.message);
            }
            else{
                return res.status(400).send(result.message);
            }

        }
        catch(error){
            console.log(error);
            next(error);
        }
    }
    async updateProduct(req,res,next){
        try{
            const {quantity}=req.query;
            const id=req.params.id;
           const result= await this.productRepository.updateProduct(id,Number(quantity));
            if(result.success){
                return res.status(201).send(result.data);
            }
            else{
                return res.status(400).send(result.message);
            }

        }
        catch(error){
            console.log(error);
            next(error);
        }
    }
}