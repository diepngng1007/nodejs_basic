// const http = require("node:http");
import express from 'express'
import router from '../src/routes/index'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const {PORT} = process.env
const app = express()


app.use(express.json())

mongoose
.connect("mongodb://127.0.0.1:27017/Products")
.then((item) => {
    console.log("Connect to database!")
})
.catch((err) => console.log(err))



app.use("/api", router)


app.listen(PORT, () => {
    console.log(`Server on ${PORT}`)
});

