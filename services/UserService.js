import postModel from "../models/PostModel.js";




export const getPost = (req, res) => {
    
    postModel.find({
       
    })
    .then((data)=>{
        res.status(200).json(data)
    
    })
    .catch((error)=>{
        res.status(500).json({error:error})
    })
}


export const createPost = (req, res) => { 
    // Cach 1
    // var title = req.body.title
    // var content = req.body.content
    // var author = req.body.author
    

    // userModel.create({
    //     title:title,
    //     content:content,
    //     author:author
    // })
    // Cach 2
    var newPost= req.body
    postModel.create(newPost)
    .then((data)=>{
        res.status(200).json(data)
    
    })
    .catch((error)=>{
        res.status(500).json({error:error})
    })
}

export const updatePost = (req, res) => {
    var _id = req.params._id
    // var {title,content, author} =req.body
    var updatePost=req.body
    // var title = req.body.title
    // var content = req.body.content
    // var author = req.body.author
    // res.json(name+ "+"+ email + "+" + password)
    
    
    postModel.findByIdAndUpdate({_id:_id },updatePost, {new:true})
    .then((data)=>{
        res.status(200).json(data)
    
    })
    .catch((error)=>{
        res.status(500).json({error:error})
    })
}

export const deletePost = (req, res) => {
    var _id = req.params._id
    // var deletePost=req.body

    
    
    postModel.findByIdAndDelete({_id:_id})
    .then((data)=>{
        res.status(200).json(data)
    
    })
    .catch((error)=>{
        res.status(500).json({error:error})
    })
}