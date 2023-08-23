import userModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { genneralAccessToken} from "../services/JwtService.js";

export const createUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!username || !email || !password || !confirmPassword) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if (password !== confirmPassword) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }

        const checkUser = await userModel.findOne({
            email: email
        })
        if (checkUser !== null) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The email is already'
            })
        }

        const hash = bcrypt.hashSync(password, 10)
        const createdUser = await userModel.create({
            username,
            email,
            password: hash
        })
        if (createdUser) {
            return res.status(200).json({
                status: 'OK',
                message: 'SUCCESS',
                data: createdUser
            })
        }

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const getAllUser = async (req, res) => {
    try {
        const allUser = await userModel.find().sort({createdAt: -1, updatedAt: -1})
        return res.status(200).json({
                status: 'OK',
                message: 'Success',
                data: allUser
            })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}






export const updateUser = async (req, res) => {
    try {

        const userId = req.params._id
        const data = req.body
        const checkUser = await userModel.findOne({
            _id: userId
        })
        if (checkUser === null) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The user is not defined'
            })
        }

        const updatedUser = await userModel.findByIdAndUpdate({_id:userId}, data, { new: true })
        return res.status(200).json({
            status: 'OK',
            message: 'SUCCESS',
            data: updatedUser
        })

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params._id
        if (!userId) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
       

        const checkUser = await userModel.findOne({
            _id: userId
        })
        if (checkUser === null) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The user is not defined'
            })
        }

        await userModel.findByIdAndDelete(userId)
        return res.status(200).json({
            status: 'OK',
            message: 'Delete user success',
        })


    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}



export const loginUser = async (req, res) => {
    try {
          const { username, password } = req.body
        if (!username || !password) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }

            const checkUser = await userModel.findOne({
                username: username
            })
            if (checkUser === null) {
                return res.status(404).json({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!comparePassword) {
                return res.status(404).json({
                    status: 'ERR',
                    message: 'The password or user is incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            
            res.cookie('token', access_token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                path: '/',
            })

            return res.status(200).json({
                status: 'OK',
                message: 'SUCCESS',
                access_token
            })
            
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// export const getDetailsUser = async (req, res) => {
//     try {
//         const userId = req.params._id
//         if (!userId) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The userId is required'
//             })
//         }
//         const response = await UserService.getDetailsUser(userId)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }


// const deleteMany = async (req, res) => {
//     try {
//         const ids = req.body.ids
//         if (!ids) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The ids is required'
//             })
//         }
//         const response = await UserService.deleteManyUser(ids)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }


// const refreshToken = async (req, res) => {
//     try {
//         let token = req.headers.token.split(' ')[1]
//         if (!token) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The token is required'
//             })
//         }
//         const response = await JwtService.refreshTokenJwtService(token)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }


// const logoutUser = async (req, res) => {
//     try {
//         res.clearCookie('refresh_token')
//         return res.status(200).json({
//             status: 'OK',
//             message: 'Logout successfully'
//         })
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }