import express from "express";
import authroutes from "./routes/auth.routes.js";
import songroutes from "./routes/song.routes.js";

import cookieParser from "cookie-parser";

const app=express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/auth',authroutes);
app.use('/songs',songroutes);


export default app;