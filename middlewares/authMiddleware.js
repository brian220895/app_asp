import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const authMiddleWare = (req, res, next) => {
    const token = req.headers.token
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'Token is invalid',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
    });
}

export const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token
    const userId = req.params._id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'Token is invalid',
                status: 'ERROR'
            })
        }
        // console.log(user)
        // {
        //     id: '64e5c73c63068380d6576094',
        //     isAdmin: false,
        //     iat: 1692789058,
        //     exp: 1692789118
        //   }

        if (user?.isAdmin || user?.id === userId) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
    });
}