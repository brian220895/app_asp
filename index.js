import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import routers from './routes/index.js';
// import { createProxyMiddleware } from 'http-proxy-middleware'
dotenv.config();
var app = express()
var port=process.env.PORT ||3001
var url =process.env.URI

// app.use(cors());

// app.use(cookieParser('anonystick'));



// app.use(express.cookieParser());
// app.use(cookieParser())
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

app.use("*",cors({
  origin:true,
  credentials:true
}))
app.use(cookieParser('anonystick'));
routers(app)




app.get('/setcookie', (req, res)=> {
    res.cookie('sitesSecurity', 'anonystick.com', { httpOnly: true, sameSite: 'none', secure: true,
    domain: 'thegioimauxanh.com'})
    res.json({ok: 3333})
    // cookies.set('myCat', 'Pacman', { domain:thegioimauxanh.com,sameSite: "none", path: '/' });
    // // console.log(cookies.get('myCat222'));
})

app.get('/getcookie', (req, res)=> {
    console.log('[ANONY] getCookie::::', req.cookies); 
    console.log('[ANONY] getCookie::::signedCookies::::',req.signedCookies.sitesSecurity)
    res.json({ok: req.cookies})
})


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