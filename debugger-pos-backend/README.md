# Debugger POS - Backend Server


## Setting up
install dependencies : npm i


## Start up

### dev start
nodemon --exec npm start

### production start

`npm run build`
This will create a build/ folder in the root directory with obfuscated code.

Copy build folder to server and :

Set env. variable to production :: NODE_ENV=production

In Windows : 
set NODE_ENV=production
npm start


## Verify the app startup
http://localhost:4000/


## Troublehooting

Error : Client does not support authentication protocol
Solution :
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
flush privileges;







