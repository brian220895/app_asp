import express from "express";
const router = express.Router()

// import { getUser,createUser,updateUser,deleteUser } from "../controllers/UserController.js";

import * as PostController from "../controllers/PostController.js";



router.get('/', PostController.getAllPost)


router.post('/', PostController.createPost)

router.put('/update/:_id', PostController.updatePost)

router.delete('/delete/:_id',PostController.deletePost)

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


export default router;