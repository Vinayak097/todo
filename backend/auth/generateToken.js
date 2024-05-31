import jwt from 'jsonwebtoken'
export const jenerateToken=({username})=>{
    const token=jwt.sign({username},process.env.JWT_SECRET)
    return token;        
}