const {check } = require('express-validator');


const email = check('email' , 'email is empty in auth').notEmpty();

const password = check('password' , 'password is empty in auth').notEmpty().custom((value) => {
    if (value &&value.length < 6){
        return Promise.reject('password is 6 char');
}
        return Promise.resolve();
});

const validLogin =[
email,
password
];

module.exports ={
 validLogin
};