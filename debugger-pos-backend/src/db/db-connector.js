var CONFIG = require("../config");


var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : CONFIG.DATABASE_SERVER_IP,
      user : CONFIG.DATABASE_USER,
      password : CONFIG.DATABASE_PASSWORD,
      database : CONFIG.DATABASE_SCHEMA_NAME
    }
});


module.exports = knex;