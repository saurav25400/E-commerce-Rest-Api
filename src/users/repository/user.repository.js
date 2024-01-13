import mongoose from "mongoose"
import UserModel from "../models/user.model.js"
import { userSchema } from "../schema/user.schema.js";
import { ApplicationError } from "../../error-handler/Application.error-hanlder.js";

const mongooseUserModel=mongoose.model('User',userSchema);
export class UserRepository{
   
    async signUp(name,email,password,userType){
        try{
            if(name===''||email===''||password===''|| userType===''){
                return {success:false,message:"failed to register"}
            }
            if(userType!=="admin"){
                return {success:false,message:"only admin is allowed to add products to inventory"}
            }
            const user=new UserModel(name,email,password,userType);
            const newUser=new mongooseUserModel(user);
            const savedUser=await newUser.save();
            return {success:true,message:"registered successfully"}

        }
        catch(error){
            throw new ApplicationError("not able to registed as user may already exist,or please ensure that email is correct",400);

        }

    }
    async findByEmail(email,type){
        try{
            const isAdminExist=await mongooseUserModel.findOne({email:email,userType:type});
            if(isAdminExist==null){
                return "user not exist";
            }
            return isAdminExist;

           


        }
        catch(error){
            throw new ApplicationError("failed to login,check your credentials properly",400);

        }
    }




}