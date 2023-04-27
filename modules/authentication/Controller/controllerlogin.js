const {validationResult} = require('express-validator');
const {login} = require('../Service/servicelogin')
const {logininput} = require("../inputauth/inputlogin")
const jwt = require ('jsonwebtoken')

const loginController =async (req , res) =>{
    const errors = validationResult (req);
    if(!errors.isEmpty()){
        res.status(422).json( {
            errors : errors.array()
        })
    }

    const {email , password} =req.body;
    let userCredential  = new logininput();
    userCredential.email = email ;
    userCredential.password = password;
    
    const user = await login (userCredential);
    if(user.length> 0 ) {
        const [userInfo] = user;
        const accessToken = jwt.sign({userInfo} , 'mySecret' , {expiresIn : 600*60})
        res.json({
            user:user[0] ,
            accessToken : accessToken
        })
    }
    res.json({
        error:"invalid Credential" 
    })
}
module.exports = {
    loginController
};