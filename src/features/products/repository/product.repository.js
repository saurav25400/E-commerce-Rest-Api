import mongoose from "mongoose";
import { ObjectId } from "mongoose";
import { ApplicationError } from "../../../error-handler/Application.error-hanlder.js";
import productSchema from "../schema/product.schema.js";

const productModel=mongoose.model('Product',productSchema);


export class ProductRepository{
    
    async createProduct(name,quantity){
        try{
            if(name===''||isNaN(quantity)){
                return {success:false,message:"failed to add products  to inventory"}
            }
            const checkProductExist=await productModel.findOne({name:name});
            if(checkProductExist){
                checkProductExist.quantity=checkProductExist.quantity+quantity;
                const res=await checkProductExist.save();
                return {success:true,message:"product added successfully",data:{product:res}};

            }
            const products=new productModel({name:name,quantity:quantity});
            const result=await products.save();
            return {success:true,message:"product added successfully",data:{product:result}};
             


        }
        catch(error){
            throw new ApplicationError('failed to add products to inventory',400);
        }
    }

    async getAllProduct(){
        try{
            const productList=await productModel.find();
            if(!productList){
                return {success:false,message:"failed to fetch products"}
            }
            return {success:true,data:{products:productList}};

        }
        catch(error){
            throw new ApplicationError("failed to fetch all products")
        }
    }

    async deleteProduct(id){
        try{
            const productExist=await productModel.findById(id);
            if(!productExist){
                return {success:false,message:"product does not exist"}
            }
            const deletedObj=await productModel.deleteOne({_id:id});
            console.log(deletedObj,'deletedObj');
            if(deletedObj.deletedCount>0){
                return {success:true,message:"product deleted"}
            }
            else{
                return {success:false,message:"failed to delete product"}
            }
        }
        catch(error){
            throw new ApplicationError("failed to delete products",400);
        }
    }

    async updateProduct(id,quantity){
        try{
            const productExist=await productModel.findById(id);
            if(!productExist){
                return {success:false,message:"product does not exist"}
            }
            productExist.quantity+=quantity;
            await productExist.save();
            return {success:true,data:{product:productExist,message:"updated successfully"}}


        }
        catch(error){
            console.log(error);
            throw new ApplicationError("unable to update products");
        }
    }
}