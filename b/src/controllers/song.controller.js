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



//node ./src/controllers/song.controller.js