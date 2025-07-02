import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

const JWT_SECRET="2c84db77340199bcde5cedf51319121812b7fb11387c28d2f40ad5c3c427ec63";

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
        JWT_SECRET,
        {expiresIn:"1d"},
    )

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
        JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.status(200).json({
        message:"user logged in  successfully",
        user:{
            id:user._id,
            username:user.username
        },
        token
    })
}
