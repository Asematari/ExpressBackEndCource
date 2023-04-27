
const {validationResult} = require('express-validator');
const {usercreate,userList,Isemailexiisuserid ,userUpdate,userDeleteApi ,userGetApi,userImage} = require('../services/user.services')
const input = require ('../input/input.js')
const inputupdate = require ('../input/inputupdate.js')
const {flieCreate} = require ('../../flieManger/services/filemanger')
const flieCreateInput = require ('../../flieManger/inputs/fileCreate.input');
const {Userimg} = require ('../input/userimg')
//post
const usercreateusingpost = async(req,res) => {
    const errors = validationResult (req);
    if(!errors.isEmpty()){
        res.status(422).json( {
            errors : errors.array()
        })
    }
    //عشان ارجع ملفات يلي انضافو ع 
    // res.json({
    //     files: req.files
    // })

    // اوبجيت عشان اعمل ملف جديد obj
    const files = req.files;

    const fileIds =await files.map (async(file) =>{
        let fileInput =new flieCreateInput ()
        fileInput.old_name = file.originalname;
        fileInput.new_name = file.filename;
        fileInput.path = file.originalname;
        // console.log (fileInput)

        //create in service ننادي فنك يلي بعمل 
        const file_id = await  flieCreate (fileInput)
        return file_id;
    })
    
    let ids =await Promise.all(fileIds);
    const {firstname,lastname,email,password} = req.body;
    let user = new input();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = password;

        const insertedUserId = await usercreate(user);
        
        ids.forEach(async(id )=>{
            let userimg = new Userimg();
            userimg.user_id =insertedUserId; 
            userimg.img_id =id; 
          await userImage(userimg);
        })

            res.json({
                result : insertedUserId
})
}
//get
const userListGet = async(req,res) => {
            const users = await userList();
                res.json({
                    result : users
})
}
//put
const UserUpdatePut = async (req,res) =>{
    const errors = validationResult (req);
    if(!errors.isEmpty()){
        res.status(422).json( {
            errors : errors.array()
        });
        }  
          //p bجبت داتا موجودة في  // destructions//
        const {firstname,lastname,email,password} = req.body;
        const {user_id} = req.params;

        const emailValidation =await Isemailexiisuserid(user_id,email);
        if(emailValidation) {
        return res.status(422).json( {
            error : "email is taken"
        });
    }
        let user =new inputupdate();
        user.user_id=user_id;
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = password;

        const updatedUser = await userUpdate (user);

     res.json({
        updatedUser:updatedUser
    });
}
//delete
const UserDelete = async(req,res) =>{
    const {user_id} = req.params;
    const  deleteusers =  await userDeleteApi(user_id);
    res.json({
        deleteusers: deleteusers
    });
}
// (Get) by one element
const UserGetOneElement = async(req,res) =>{
    const {user_id} = req.params;
    const  user =  await userGetApi(user_id);
    res.json({
        user: user
    });
}
 
module.exports = {
    usercreateusingpost ,
    userListGet,
    UserUpdatePut,
    UserDelete,
    UserGetOneElement
    
};