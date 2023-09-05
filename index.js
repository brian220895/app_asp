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

// app.use((req, res, next) => {
//   // res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// }) 

// const allowCrossDomain = (req, res, next) => {
//   res.header(`Access-Control-Allow-Origin`, `localhost:3000`);
//   res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
//   res.header(`Access-Control-Allow-Headers`, `Content-Type`);
//   next();
// };

// app.use(
  
//   cors({
//     allowedHeaders:"Content-Type",
//     allowMethods:"GET,PUT,POST,DELETE",
//     origin:"localhost:3000",
// })

// )


// app.use(cookieParser('anonystick'));


// app.use(cors({
//   'allowedHeaders': ['sessionId', 'Content-Type'],
//   'exposedHeaders': ['sessionId'],
//   'origin': '',
//   'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   'preflightContinue': true
// }));


var  corsOptions  = {
  origin:"https://poetic-hamster-ea6a33.netlify.app", //frontend url
  credentials: true,
  // allowedHeaders:'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  // methods:'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  // exposedHeaders:'Content-Range, X-Content-Range'
}

 app.use(cors(corsOptions));

// const allowed_origins = ["https://thegioimauxanh.com", "http://localhost:3001"];
// app.use(function(req, res, next) {
//     // const origin = req.headers.origin;
//     // if (allowed_origins.indexOf(origin) > -1) {
//         res.setHeader('Access-Control-Allow-Origin', origin);
//     };
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });




app.use(cookieParser())
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });





// app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Credentials",true);
//   res.header("Access-Control-Allow-Origin","localhost:3000");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Request-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );
//   next();
// })








// app.use((req, res, next) => {
//   // res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// }) 

// app.use(cors({ origin: true }));




// app.use("*",cors({
//   origin: "http://localhost:3000",
//   methods: ["POST","GET", "POST", "PUT", "DELETE"],
//   credentials: true,
//   maxAge: 3600
// }))

routers(app)



// app.use(cookieParser('anonystick'));
// app.get('/setcookie', (req, res)=> {
//     res.cookie('sitesSecurity', 'anonystick.com', { httpOnly: true, sameSite: 'none', secure: true,
//     domain:".thegioimauxanh.com"})
//     res.json({ok: 3333})
//     // cookies.set('myCat', 'Pacman', { domain:thegioimauxanh.com,sameSite: "none", path: '/' });
//     // // console.log(cookies.get('myCat222'));
// })

// app.get('/getcookie', (req, res)=> {
//     console.log('[ANONY] getCookie::::', req.cookies); 
//     console.log('[ANONY] getCookie::::signedCookies::::',req.signedCookies.sitesSecurity)
//     res.json({ok: req.cookies})
// })


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