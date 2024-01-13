import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from "../repository/user.repository.js";

export default class UserController{
    constructor(){
        this.userRepository=new UserRepository();
    }

    async signUp(req,res,next){
        try{
            const {name,email,password,userType}=req.body;
            console.log(name,email,password,type);
            const hashedPassword=await bcrypt.hash(password,12);
            const result=await this.userRepository.signUp(name,email,hashedPassword,userType);
            if(result.success){
                return res.status(201).send(result.message);
            }
            else{
                return res.status(400).send(result.message);
            }

        }
        catch(err){
            console.log(err);
            next(err);
        }
    }


    async signIn(req,res,next){
        try{
            const {email,password,userType}=req.body;
        const existingAdmin=await this.userRepository.findByEmail(email,userType);
        console.log(existingAdmin,'existingadmin');
        const result=await bcrypt.compare(password,existingAdmin.password);
        if(result){
            const token=jwt.sign({email:existingAdmin.email,userType:existingAdmin.userType},process.env.SECRET_KEY,{ expiresIn: '1h' });
            return res.status(200).send({message:"loggedin successfully",token:token});

        }
        return res.status(400).send("check your credentials properly!!!");
        

        }
        catch(error){
            console.log(error);
            next(error);

        }
            
    }

    
    
}