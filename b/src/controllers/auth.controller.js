import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function registerUser(req, res) {
    const { username, password } = req.body;
    
    const isuserExist = await userModel.findOne({username});

    if(isuserExist){
        return res.status(400).json({
            message:"user already exists"
        })
    }

    const hashPassword= await bcrypt.hash(password,10);


    const user = await userModel.create({
         username,
         password:hashPassword,
    });

    const token=jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"},
    )

    res.cookie('token',token);

    res.status(201).json({
        message:"user registered successfully",
        user:{
            id: user._id,
            username: user.username
        },
        token
    })
    
}



export async function loginUser(req,res){
    const {username,password}=req.body;

    const user = await userModel.findOne({
        username,
    })

    if(!user){
        res.status(400).json({
            message:"invalid username or password"
        })
    }

    const isPasswordValid= await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        res.status(400).json({
            message:"invalid username or password"
        })
    }

    const token=jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie('token',token);

    res.status(200).json({
        message:"user logged in  successfully",
        user:{
            id:user._id,
            username:user.username
        },
        token
    })
}



// we are calling me api to ensure that the user is logged in and then he can access the protected routes and protected routes here means the routes that are protected and only the logged in user can access them
export async function me(req,res){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"unauthorized"
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        return res.status(200).json({
            message:"user logged in successfully",
            user:{
                id:decoded.id
            }
        })
    }
    catch(err){
        return res.status(401).json({
            message:"unauthorized"
        })
    }

}







// we are using jwt to verify the token
// we are using cookies to store the token

