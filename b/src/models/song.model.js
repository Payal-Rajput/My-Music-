import mongoose from 'mongoose';

const songSchema=new mongoose.Schema({
    title:{
       type:String,
       required:true,
       unique:true    
    },
    artist:{
        type:String,
        required:true
    },
    poster:{
        type:String,
        deafult:"https://i.pinimg.com/736x/e0/94/c9/e094c9ae9929e2df6d2f026fdb9554a6.jpg"
    },
    audio:{
        type:String,
        required:true,
        
    },
   
})

const songModel=mongoose.model('song',songSchema);

export default songModel;