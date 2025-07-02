import mongoose from 'mongoose';

function connectDB(){
    mongoose.connect('mongodb://localhost:27017/song')
    .then(()=>{
        console.log("connected to mongodb successfully ");
        
    })
    .catch((err)=>{
        console.log("error detected in db ",err); 
    })
}

export default connectDB;