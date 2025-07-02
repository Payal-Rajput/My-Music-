import express from "express";
import authroutes from "./routes/auth.routes.js";
import songroutes from "./routes/song.routes.js";

const app=express();
app.use(express.json());

app.use('/',authroutes);
app.use('/',songroutes);


export default app;