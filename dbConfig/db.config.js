import mongoose from "mongoose";

 const connectionUsingMongooseToMongoDB=async()=>{
    try{
        await mongoose.connect(process.env.DB_URL,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        });
        console.log("connected to mongodb successfully.");

    }
    catch(error){
        console.log("error ocurred while connecting to mongodb");
    }
}
export default connectionUsingMongooseToMongoDB;