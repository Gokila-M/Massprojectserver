import jwt from 'jsonwebtoken'


async function auth(req,res,next){
    const token=req.header('token')  
    if(!token) return res.status(403).json({message:"forbidden - token is unavailable"}) 
    try {
        const decoded=jwt.verify(token,process.env.JWT)
        req.user=decoded
        next(); 
    } catch (error) { 
        if (error.message === 'jwt malformed') return res.status(401).json({message:'invalid token or '+error.message})
        res.status(401).json({message:error.message})
    }
}

export default auth;