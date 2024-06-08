import express, { Request, Response, NextFunction } from "express";
export const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
require('dotenv').config();
import { ErrorMiddleware } from "./middleware/error";


// body parser - for Cloudinary
app.use(express.json({limit: "50mb"}));

// cookie-parser
app.use(cookieParser());

// cors => cross origin resource sharing
app.use(cors({
    origin: process.env.ORIGIN, 
}));

// testing API
app.get("/test", (req:Request , res:Response, next:NextFunction) => {
    res.status(200).json({
        success: true,
        message: "API is working"
    })
})

// unknown route
app.all("*", (req:Request, res:Response, next:NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`)
    res.send(404).send();
    next(err)
})

app.use(ErrorMiddleware)
