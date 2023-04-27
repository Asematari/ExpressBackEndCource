const knex = require ('../../../DBConnection/DBConnection.js')
const {FILE_MANAGER} = require('../../main/constant/constant')

const flieCreate = async(fileInput) =>{
const fileId = await knex (FILE_MANAGER) .insert({
    old_name : fileInput.old_name,
    path : fileInput.path,
    new_name : fileInput.new_name
})

return fileId;
}

module.exports = {
    flieCreate
};