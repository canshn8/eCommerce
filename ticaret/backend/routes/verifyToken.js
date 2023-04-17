const jwt = require('jsonwebtoken')


const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;
    console.log(authHeader)
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC, (err,user) => {
            if(err) res.status(403).json("Token Geçersiz")    
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("Kimlik Dogrulanmadi")
    }
}

const verifyTokenAndAuthorization = (req,res,next) => {
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user){
            next();
        }else{
            return res.status(403).json("izin verilemedi")
        }
    })
}


const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken(req,res,()=>{
        if(req.user){
            next();
        }else{
            return res.status(403).json("izin verilemedi")
        }
    })
}


module.exports = {verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin};
