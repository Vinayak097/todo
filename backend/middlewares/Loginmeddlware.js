import jwt from 'jsonwebtoken'
import { User } from '../db.js'

async function loginMiddleware (req, res, next) {
    
    const token = req.headers.authorization
    console.log("entered in login", token)

 
    try {
        const isValid = jwt.verify(token, process.env.JWT_SECRET)
   
        const username=isValid.username
        const userExist = await User.findOne({
            username
        })

        if (!userExist) {
            res.json({ msg: "Create an account to continue" })
        }
        req.user = userExist
        
        next()
    } catch (error) {
        res.status(403).json("You are not authorized")
        return
    }
}

export default loginMiddleware
