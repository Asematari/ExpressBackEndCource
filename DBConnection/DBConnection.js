const knex = require('knex') ({
    
    //configuration
    client: 'mysql',
    connection : {
        host : '127.0.0.1',
        port :'3306',
        user : 'root',
        password : '',
        database : 'nodeJsFullStack'

    }

});

module.exports = knex;