
const {check } = require('express-validator');
const knex = require('../../../DBConnection/DBConnection');
const { USERS } = require('../../main/constant/constant');

const firstname = check('firstname' , 'firstname is empty').notEmpty();
const lastname = check('lastname' , 'lastname is empty').notEmpty();
const email = check('email' , 'email is empty').notEmpty().custom(async(value) => {
        const user = await knex(USERS).where ({email : value }).returning ('*');
    if (user.length > 0){
        return Promise.reject('email is token');
        
    }
    return Promise.resolve();
});

const emailForUpdate =check('email' , 'email is empty').notEmpty();

const password = check('password' , 'password is empty').notEmpty().custom((value) => {
        if (value &&value.length < 6){
            return Promise.reject('password is 6 char');
    }
            return Promise.resolve();
});

//post
const UserCreateValidation = [
firstname ,
lastname ,
email ,
password
] ;
//put
const  UserUpdateValidation =[
    firstname,
    lastname,
    password,
    emailForUpdate
];

module.exports = {
    UserCreateValidation,
    UserUpdateValidation
    
};