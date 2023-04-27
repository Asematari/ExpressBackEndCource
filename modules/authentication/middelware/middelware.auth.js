const jwt = require ('jsonwebtoken');

const Authenticated = (req , res, next) =>{
const token = req.headers.token;

if (token){
    try{
        const user = jwt.verify (token ,'mySecret')
        next();
    }
    catch(err) {
        res.json ({
            Error : "in valid token"
        })
    }
}
else{
    res.json ({
        Error : "token does not exit غيرموجود"
    })
}
}
module.exports = Authenticated;
