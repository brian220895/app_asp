import userModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
// import { genneralAccessToken} from "../services/JwtService.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


let refreshTokens=[]

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
        // const {...others}=createdUser._doc
        if (createdUser) {
            return res.status(200).json({
                status: 'OK',
                message: 'SUCCESS',
                data:createdUser
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
        // const {...others}=allUser._doc
        // console.log(allUser)
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
           data:updatedUser
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

        const deletedUser = await userModel.findByIdAndDelete(userId)
        // const {...others}=deletedUser._doc
        return res.status(200).json({
            status: 'OK',
            message: 'Delete user success',
            data:deletedUser
        })


    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const generateAccessToken=(checkUser)=>{
    return jwt.sign({
        id:checkUser.id,
        isAdmin:checkUser.isAdmin,
    }, process.env.JWT_ACCESS_KEY, { expiresIn: '365d' })
}

export const generateRefreshToken=(checkUser)=>{
    return jwt.sign({
        id:checkUser.id,
        isAdmin:checkUser.isAdmin,
    }, process.env.JWT_REFRESH_KEY, { expiresIn: '365d' })
}

// export const loginUser = async (req, res) => {
//     try {

//         console.log('loginasdasvsfgsdgds',req.body)
//         //   const { username, password } = req.body
//     //   console.log('req.body', req.body)
//     //   console.log('password', password)
//         // if (!username || !password) {
//         //     return res.status(404).json({
//         //         status: 'ERR',
//         //         message: 'The input is required'
//         //     })
//         // }

//         //     const checkUser = await userModel.findOne({
//         //         username: username
//         //     })
//         //     if (!checkUser) {
//         //         return res.status(404).json({
//         //             status: 'ERR',
//         //             message: 'The user is not defined'
//         //         })
//         //     }
//         //     const comparePassword = bcrypt.compareSync(password, checkUser.password)

//         //     if (!comparePassword) {
//         //         return res.status(404).json({
//         //             status: 'ERR',
//         //             message: 'The password or user is incorrect'
//         //         })
//         //     }

//             // const access_token = await genneralAccessToken({
//             //     id: checkUser.id,
//             //     isAdmin: checkUser.isAdmin
//             // })
         
//         //   res.cookie( 'token', "sdfsdsdf",{ maxAge: 1000 * 60 * 10, httpOnly: false });
      
            
     
//             // if(checkUser && comparePassword){
//             //   const accessToken = generateAccessToken(checkUser)
//             //   const refreshToken = generateRefreshToken(checkUser)
 
//             res.cookie("token","sdfdsfdsfsdf",{  httpOnly: true,
//                 secure:true,
//                 sameSite: "strict"
//             });
      
     
            
//             //   res.cookie("refreshToken","refreshToken", {
//                 // httpOnly: true,
//                 // secure:true,
//                 // path: "/",
//                 // sameSite: "strict",
//             //   });y
//             //   const {password,...others}=checkUser._doc
//             //   // console.log(checkUser._doc)
//             //   return res.status(200).json({
//             //       status: 'OK',
//             //       message: 'SUCCESS',
//             //       accessToken,
//             //     //   refreshToken,
//             //       ...others
//             //   })
//             // }
             
//             return res.status(200).json({
//                 status: 'OK',
//                 message: 'SUCCESS'
//             })
              
              
//       } catch (e) {
//           return res.status(404).json({
//               message: e
//           })
//       }
//   }



  

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
            if (!checkUser) {
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

            // const access_token = await genneralAccessToken({
            //     id: checkUser.id,
            //     isAdmin: checkUser.isAdmin
            // })
         
            
     
            if(checkUser && comparePassword){
              const accessToken = generateAccessToken(checkUser)
              const refreshToken = generateRefreshToken(checkUser)

              res.cookie("token",accessToken,{ 
                //  httpOnly: true,
                secure:true,
                sameSite: false
            });

            res.cookie("refreshToken",refreshToken,{ 
                //  httpOnly: true,
                secure:true,
                sameSite: false
            });
          
            //   res.cookie("token", accessToken, {
            //     // httpOnly: true,
            //     secure:true,
            //     path: "/",
            //     sameSite: "strict",
            //   });

            //   res.cookie("refreshToken", refreshToken, {
            //     // httpOnly: true,
            //     secure:false,
            //     path: "/",
            //     sameSite: "strict",
            //   });
         
              const {password,...others}=checkUser._doc
              // console.log(checkUser._doc)
              return res.status(200).json({
                  status: 'OK',
                  message: 'SUCCESS',
                  accessToken,
                  ...others
              })
            }
             
  
              
              
      } catch (e) {
          return res.status(404).json({
              message: e
          })
      }
  }













  export const requestRefreshToken =(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        // console.log('refreshToken_022222',refreshToken)
        // console.log('refreshToken',refreshToken)
    //    if(!refreshToken)  return res.status(401).json('You are not authenticated')
    //    if(!refreshTokens.includes(refreshToken)){
    //     return res.status(403).json("Refresh token is not valid")
    //    }
       jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, function (err, user) {
        if (err) {
            return res.status(404).json('Token is invalid')
            // console.log(err)
        }
        // refreshTokens = refreshTokens.filter((token)=>token !==refreshToken)
        // const newAccessToken= generateRefreshToken(user)
        const newAccessToken=generateAccessToken(user)
        const newRefreshToken=generateRefreshToken(user)
        // refreshTokens.push(newRefreshToken)
        
        // res.cookie('token', newAccessToken, {
        //     // httpOnly: true,
        //     // secure: true,
        //     // sameSite: 'strict',
        //     path: '/',
        //     sameSite: false,
        // })
        // res.cookie( 'token', newAccessToken,{ maxAge: 1000 * 60 * 10, httpOnly: false });


        // res.cookie('refreshToken', newRefreshToken, {
        //     // httpOnly: true,
        //     // secure: true,
        //     // sameSite: 'strict',
        //     // path: '/',
        //     sameSite: false,
        // })
      
        // res.cookie( 'refreshToken', newRefreshToken,{ maxAge: 1000 * 60 * 10, httpOnly: false });

        return res.status(200).json({
            status: 'OK',
            message: 'SUCCESS',
            accessToken:newAccessToken,
            refreshToken:newRefreshToken
        })
        // console.log(user)
        // {
        //     id: '64e5c73c63068380d6576094',
        //     isAdmin: false,
        //     iat: 1692789058,
        //     exp: 1692789118
        //   }

      
    });

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token')
        // res.clearCookie('refreshToken')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully'
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}




export const getDetailUser = async (req, res) => {
    try {
        const userId = req.params._id
        if (!userId) {
            return res.status(200).json({
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
        const {password,...others}=checkUser._doc
        return res.status(200).json({
                            status: 'OK',
                            message: 'SUCESS',
                            ...others
                        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


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


