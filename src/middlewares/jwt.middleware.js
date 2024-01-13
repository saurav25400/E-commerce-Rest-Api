import jwt from 'jsonwebtoken';

const jwtMiddleware=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        return res.status(401).send("Unauthorized");
    }
    try{
        const payload=jwt.verify(token,process.env.SECRET_KEY);
        req.email=payload.email;
        req.userType=payload.userType;

    }
    catch(error){
        console.log(error);
        return res.status(401).send("Unauthorized");

    }
    
    next();
}
export default jwtMiddleware;