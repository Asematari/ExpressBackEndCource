const express = require('express');
const router = express.Router();
const { UserCreateValidation,UserUpdateValidation}= require ('../validation/user.validation');
const { usercreateusingpost , userListGet , UserUpdatePut,UserDelete,UserGetOneElement }= require ('../controller/user.controller.js')
//filemanger to database
const upload = require ('../../flieManger/helper/helper');
//login 
const Authenticated = require ('../../authentication/middelware/middelware.auth');
const Authorized = require ('../../authentication/middelware/middleware.authorization')

//api
router.post ('/users',Authorized ('w_users'), upload.array('files ', 10), UserCreateValidation, usercreateusingpost);
router.get ('/users',Authenticated, Authorized ('r_users'),  userListGet);
router.put ('/users/:user_id',UserUpdateValidation,UserUpdatePut);
router.delete ('/ users/:user_id',Authorized ('d_users'),UserDelete );
router.get ('/users/:user_id',Authenticated, UserGetOneElement );


module.exports=router;
