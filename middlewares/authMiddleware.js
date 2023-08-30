import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const verifyMiddleWare = (req, res, next) => {
 
    if(req.headers.token){
    //    const accessToken=token.split(" ")[1]
    const accessToken=req.headers.token
    // console.log('HEADERS',accessToken)
       jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, function (err, user) {
        if (err) {
          return res.status(403).send({ message: "Token is invalid" });
        }
    
        next();
       
      });
        
    }else{
        return res.status(404).json('The authemtication')
    }
   
}

export const authAdminMiddleWare = (req, res, next) => {
    // const token = req.headers.token
   
    if(req.headers.token){

    //    const accessToken=token.split(" ")[1]
       const accessToken=req.headers.token
       console.log('header milddd',accessToken)
       jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, function (err, user) {
            if (err) {
                return res.status(404).json('Token is invalid')
            }
            if (user?.isAdmin) {
                next()
            } else {
                return res.status(404).json('The authemtication')
            }
        });
    }else{
        return res.status(404).json('The authemtication has been provided')
    }
   
}

export const authUserMiddleWare = (req, res, next) => {
    // const token = req.headers.token
    const userId = req.params._id
    // console.log(userId)
    // if(token){
    // const accessToken=token.split(" ")[1]
    const accessToken=req.headers.token

    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, function (err, user) {
        if (err) {
            return res.status(404).json('Token is invalid')
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
            return res.status(404).json('The authemtication')
        }
    });

//    }else{
//         return res.status(404).json('The authemtication')
//     }

   
    
}