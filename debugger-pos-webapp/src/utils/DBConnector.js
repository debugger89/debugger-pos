import config from "../config.json";
import mysql from 'mysql';

export const DBConnector = () => {
  // Add the credentials to access your database
  let connection = mysql.createConnection({
    host: config.DATABASE_SERVER_IP,
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_SCHEMA_NAME,
  });

  // connect to mysql
  connection.connect(function (err) {
    // in case of error
    if (err) {
      alert( err.code );
      console.log(err.code);
      console.log(err.fatal);
    }
  });
  return connection;
};
