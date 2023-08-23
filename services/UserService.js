import userModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { genneralAccessToken} from "./JwtService.js";
// import dotenv from 'dotenv'
// dotenv.config()

export const createUser = (newUser) => {
    // console.log(newUser)
    return new Promise(async (resolve, reject) => {
        const { username, email, password} = newUser
        try {
            const checkUser = await userModel.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
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
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

export const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await userModel.find().sort({createdAt: -1, updatedAt: -1})
            resolve({
                status: 'OK',
                message: 'Success',
                data: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}



export const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await userModel.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            const updatedUser = await userModel.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

export const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await userModel.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            await userModel.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}


export const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin
        try {
            const checkUser = await userModel.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password or user is incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            // const refresh_token = await genneralRefreshToken({
            //     id: checkUser.id,
            //     isAdmin: checkUser.isAdmin
            // })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token
            })
        } catch (e) {
            reject(e)
        }
    })
}

// export const getDetailsUser = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const user = await userModel.findOne({
//                 _id: id
//             })
//             if (user === null) {
//                 resolve({
//                     status: 'ERR',
//                     message: 'The user is not defined'
//                 })
//             }
//             resolve({
//                 status: 'OK',
//                 message: 'SUCESS',
//                 data: user
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }


// const deleteManyUser = (ids) => {
//     return new Promise(async (resolve, reject) => {
//         try {

//             await User.deleteMany({ _id: ids })
//             resolve({
//                 status: 'OK',
//                 message: 'Delete user success',
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }


