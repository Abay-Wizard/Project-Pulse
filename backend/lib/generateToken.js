import jwt from 'jsonwebtoken'

const generateToken =async(id,res)=>{
    try {
        const token=jwt.sign({id},process.env.jwt_secret,{expiresIn:'7d'})
        res.cookie('jwt',token,{
            maxAge:7*24*60*60*1000,
            secure:process.env.NODE_ENV ==='production',
            sameSite:process.env.NODE_ENV ==='production' ? 'none':'lax',
            httpOnly:true
        })
        return token
    } catch (error) {
        console.log(error?.message)
    }
}

export default generateToken
