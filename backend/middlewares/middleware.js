import { User } from "../db"

async function userExistMiddleware(req, res, next) {
    const username = req.username
    const userExist = await User.findOne({
        username
    })
    if (!userExist) {
        res.json({ msg: "Create an account to continue" })
    }
    req.user = userExist
    next()
}

module.exports = {
    userExistMiddleware
}