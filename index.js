import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
// import mongoose from 'mongoose'
// import routers from './routes/index.js';
dotenv.config();
var app = express()
var PORT=process.env.PORT
var URI =process.env.URI

// import bodyParser from 'body-parser' 

app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));



app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// routers(app)


// mongoose
//   .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to DB');
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log('err', err);
//   });

app.get('/', (req,res)=>{
  res.json('backend')
})

var port=5000
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})