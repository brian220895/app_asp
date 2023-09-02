import express from "express";
const router = express.Router()
import {authAdminMiddleWare,authUserMiddleWare,verifyMiddleWare} from "../middlewares/authMiddleware.js"

// import { getUser,createUser,updateUser,deleteUser } from "../controllers/UserController.js";

import * as UserController from "../controllers/UserController.js";




router.get('/',verifyMiddleWare,UserController.getAllUser)

router.post('/', UserController.createUser)

router.put('/update/:_id',authUserMiddleWare, UserController.updateUser)

router.delete('/delete/:_id',authUserMiddleWare,UserController.deleteUser)



router.get('/getdetail/:_id', UserController.getDetailUser)

router.post('/login', UserController.loginUser)

router.post('/refresh', UserController.requestRefreshToken)

router.post('/logout', UserController.logoutUser)
export default router;