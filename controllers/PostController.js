import postModel from "../models/PostModel.js";

export const createPost = async (req, res) => {
    // console.log(req.body)
    try {
        const { title,attachment} = req.body
        if (!title || !attachment) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } 
        

        const checkPost = await postModel.findOne({
            title: title
        })
        if (checkPost !== null) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The post is already'
            })
        }

        const createdPost = await postModel.create({
            title,
            attachment
        })
        if (createdPost) {
            return res.status(200).json({
                status: 'OK',
                message: 'SUCCESS',
                data: createdPost
            })
        }

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const getAllPost = async (req, res) => {
    try {
        const allPost = await postModel.find().sort({createdAt: -1, updatedAt: -1})
        return res.status(200).json({
                status: 'OK',
                message: 'Success',
                data: allPost
            })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}






export const updatePost = async (req, res) => {
    try {

        const postId = req.params._id
        const data = req.body

      
        const checkPost = await postModel.findOne({
            _id:postId
        })
        if (checkPost === null) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The user is not defined'
            })
        }
  
        const updatedPost = await postModel.findByIdAndUpdate({_id:postId}, data, { new: true })
        return res.status(200).json({
            status: 'OK',
            message: 'SUCCESS',
            data: updatedPost
        })

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params._id
        if (!postId) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
       

        const checkPost = await postModel.findOne({
            _id: postId
        })
        if (checkPost === null) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The user is not defined'
            })
        }

        const DeletedPost = await postModel.findByIdAndDelete(postId)
        return res.status(200).json({
            status: 'OK',
            message: 'Delete user success',
            data:DeletedPost
        })


    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}




