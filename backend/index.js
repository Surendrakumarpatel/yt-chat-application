// const express = require('express')// method-1
import express from "express"; // method-2
import dotenv from "dotenv";
import path from "path"
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
dotenv.config({});

 
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    origin:'http://localhost:8080',
    credentials:true
};
app.use(cors(corsOption)); 


// routes
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
const __dirname = path.resolve();
 
app.use(express.static(path.join(__dirname,"../frontend/build")));
 
app.get("*", (req,res)=>{
     res.sendFile(path.join(__dirname,"../frontend/build/index.html"));
})

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at prot ${PORT}`);
});

