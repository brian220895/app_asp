import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import routers from './routes/index.js';
// import { createProxyMiddleware } from 'http-proxy-middleware'
dotenv.config();
var app = express()
var port=process.env.PORT ||3001
var url =process.env.URI

// var  corsOptions  = {
//   origin:'https://thegioimauxanh.com', //frontend url
//   credentials: true,
//   allowedHeaders:'Origin, X-Requested-With, Content-Type, Accept, Authorization',
//   methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
//   exposedHeaders:'Content-Range, X-Content-Range'
// }


var  corsOptions  = {
  origin:["https://thegioimauxanh.com","http://localhost:3000"], //frontend url
  credentials: true,
  allowedHeaders:'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
  exposedHeaders:'Content-Range, X-Content-Range'
}

// Value in corsOptions must be a string ['GET,HEAD,PUT,PATCH,POST,DELETE'], ['GET','HEAD','PUT','PATCH','POST','DELETE'],
// 'GET,HEAD,PUT,PATCH,POST,DELETE'

// Value in origin must be the same domain, it will reject if there is any difference, ex:http://localhost:3000/   (reject due to '/')

// axios must have:  const config = {
//   withCredentials: true,
//    headers: {'Content-Type': 'application/json',}
// };
  
 app.use(cors(corsOptions));




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
