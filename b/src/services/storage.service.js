import ImageKit from "imagekit";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.IMAGEKIT_PUBLIC_KEY)

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});


export function uploadFile(file){
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file: file,
            fileName: "audio-file-" + Date.now() + ".mp3",
            folder: "/audio-files/"
        }, function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}








// imagekit.upload({
//     file:"https://i.pinimg.com/736x/e2/20/8f/e2208fd1ad3d6570f486e6535f85b6d7.jpg",
//     fileName:"test.jpg",

// })
// .then(response=>{
//     console.log(response);
    
// })

//node ./src/services/storage.service.js








