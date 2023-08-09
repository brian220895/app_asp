import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import routers from './routes/index.js';
dotenv.config();
var app = express()
var port=process.env.PORT ||5000
var url =process.env.URI

// import bodyParser from 'body-parser' 

// app.use(cors());
// app.use(express.json({ limit: '30mb' }));
// app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// import router1 from './apiRouter.js'
// app.use('/admin/api/v1/', router1)

app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

routers(app)
// app.use('/posts', posts);

// app.get('/posts',(req,res)=>{
//   res.json(url)
//   console.log(url)
// })


mongoose
  .connect( url || "mongodb+srv://trmthanh220895:d2zi3piX30pKVXpx@cluster05072023.8wowfby.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
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