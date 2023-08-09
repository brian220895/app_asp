import * as UserService from "../services/UserService.js";

export const getPost = (req, res) => {
    UserService.getPost(req, res)
   
}
export const createPost = (req, res) => {
    UserService.createPost(req, res)
}

export const updatePost = (req, res) => {
    UserService.updatePost(req, res)
   
}

export const deletePost = (req, res) => {
    UserService.deletePost(req, res)
   
}




