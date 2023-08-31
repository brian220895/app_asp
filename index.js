import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import routers from './routes/index.js';
dotenv.config();
var app = express()
var port=process.env.PORT ||3001
var url =process.env.URI

app.use(cors());

// app.use(cors({
//   origin:[
//     'https://thegioimauxanh.com',
    
//   ],
//   credentials:true,
//   method:['get','put','post','delete','options'],
//   allowedHeaders:[
//     'Access-Control-Allow-Origin',
//     'Content-Type',
//     'Authorization',
//     'token'
//   ],
// }));


app.use(cookieParser())
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

routers(app)

mongoose
  .connect( url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log('err', err);
  });

 


// app.listen(port, ()=>{
//     console.log(`Server started on port ${PORT}`)
// })