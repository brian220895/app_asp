import express from "express";
const router = express.Router()

// import { getUser,createUser,updateUser,deleteUser } from "../controllers/UserController.js";

import * as PostController from "../controllers/PostController.js";

router.get('/', PostController.getPost)

router.post('/', PostController.createPost)

router.put('/update/:_id', PostController.updatePost)

router.delete('/delete/:_id',PostController.deletePost)



export default router;