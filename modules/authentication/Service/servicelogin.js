const knex = require ('../../../DBConnection/DBConnection.js')
const {USERS} = require ('../../main/constant/constant')

const login = async(loginCredential)  => {

    const user = await knex(USERS) .where ('email ' ,loginCredential.email ) .where ('password' , loginCredential.password) .returning ('*');
    return user;
}
module .exports ={

    login
}