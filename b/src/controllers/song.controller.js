import songModel from "../models/song.model.js";
import { uploadFile } from "../services/storage.service.js"


export async function upload (req,res){
    
    // console.log(req.file, req.body);

    const result= await uploadFile(req.file.buffer);
    
    const {artist,title} = req.body;
    
    const audiourl = result.url;


    const song = await songModel.create({
        artist,
        title,
        audio:audiourl
    })

    res.status(201).json({
        message:"song uploaded successfully",
        song:{
            id:song._id,
            title:song.title,
            artist:song.artist,
            audio:song.audio

        }
    })
}


export async function getSongs(req,res){

    const songs=await songModel.find();

    res.status(200).json({
        message:"song fetched successfully",
        songs:songs
    });
}



export async function getSongById(req,res){

    const songId=req.params.id;

    const song=await songModel.findOne({
        _id:songId
    });

    res.status(200).json({
        message:"song fetched successfully",
        song:song
    });
}



export async function searchSongs(req,res){

    const text=req.query.text;

    const songs = await songModel.find({
        title:{
            $regex: text,  // serach that will contain text
            $options: 'i' // case insensitive
        }
    })
    
    res.status(200).json({
        message:"songs fetched successfully",
        songs:songs
    });
}


//node ./src/controllers/song.controller.js