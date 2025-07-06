import { upload , getSongs, getSongById, searchSongs } from '../controllers/song.controller.js';

import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();


const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage }); 

const router = express.Router();


router.use((req,res,next)=>{

    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        next();
    }
    catch(err){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
})



router.post('/upload', uploadMiddleware.single("song") ,upload);

router.get('/get-songs',getSongs);

router.get('/get-song/:id',getSongById);

router.get('/search-songs',searchSongs);



export default router;