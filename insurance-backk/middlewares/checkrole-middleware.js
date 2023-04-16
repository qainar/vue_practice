import jwt from "jsonwebtoken";

export default function checkroleMiddleware(role){
    return (req,res, next) => {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

        if (decodedToken.role === role){
            next()
        } else {
            res.status(403).json({message: 'You do not have access'})
        }



    }
}