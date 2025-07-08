import express from "express";
import authroutes from "./routes/auth.routes.js";
import songroutes from "./routes/song.routes.js";

import cookieParser from "cookie-parser";
import cors from 'cors';


const app=express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


/* POST /auth/register */
/* POST /auth/login */
app.use('/auth',authroutes);

/* POST /songs/upload */
/* GET /songs/get-songs */
/* GET /songs/get-song/:id */
/* GET /songs/search-songs */
app.use('/songs',songroutes);


export default app;