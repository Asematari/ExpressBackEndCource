const knex = require ('../../../DBConnection/DBConnection.js')
const {USERS , USERS_IMAGES} = require ('../../main/constant/constant.js')

//post
const usercreate = async(user) =>{
const insertedUser = await knex (USERS) .insert ({
        firstname : user.firstname,
        lastname : user.lastname,
        email : user.email,
        password : user.password
    });
        return insertedUser
}
//get
const userList =async () =>{
    const users = await knex(USERS).returning ('*');
    return users
}

//put
const Isemailexiisuserid = async(user_id,email) =>{
// select all from users where id not equals user_id &&where email is not equals email_id
const user = await knex(USERS).whereNot('id',user_id).where ('email',email).returning ('*');
    return user.length == 0 ?  false : true ;
}
const userUpdate = async(user)=>{
    const updatedUser = await knex(USERS).where('id', user.user_id ).update({
    firstname : user.firstname,
    lastname : user.lastname,
    email : user.email,
    password : user.password});
    return updatedUser
}

const userDeleteApi = async(user_id) => {
const deleteuser =  await knex(USERS) .where ('id' ,user_id).del();
return deleteuser; 
}
const userGetApi = async(user_id) => {
    const GetUserOne =  await knex(USERS).where('id',user_id).returning('*')
    return GetUserOne; 
}
const userImage =async (userImgInfo) =>{
await knex (USERS_IMAGES).insert({
    user_id : userImgInfo.user_id,
    img_id : userImgInfo.img_id

})

}

module.exports = {
    usercreate ,
    userList,
    Isemailexiisuserid,
    userUpdate ,
    userDeleteApi,
    userGetApi,
    userImage
    
}