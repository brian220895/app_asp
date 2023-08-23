import express from "express";
const router = express.Router()
import {authMiddleWare,authUserMiddleWare} from "../middlewares/authMiddleware.js"

// import { getUser,createUser,updateUser,deleteUser } from "../controllers/UserController.js";

import * as UserController from "../controllers/UserController.js";




router.get('/', UserController.getAllUser)

router.post('/', UserController.createUser)

router.put('/update/:_id',authUserMiddleWare, UserController.updateUser)

router.delete('/delete/:_id',UserController.deleteUser)

router.post('/login', UserController.loginUser)



export default router;