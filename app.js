const express=require('express');
const app=express();
//const session=require('express-session');
const path=require('path')
const mysql = require('mysql')
const myConnection = require('express-myconnection')
const bodyParser = require('body-parser');
const server=require('http').createServer(app)
const config = require('./db')

const dbOptions = {
	host:config.database.host,
	user:config.database.user,
	password:config.database.password,
	port:config.database.port,
	database : config.database.db
}
const routes = require('./routes/index');
const formidable=require('express-formidable');
app.use(express.static('public'));
app.use(myConnection(mysql,dbOptions,'pool'));
//app.use(session({secret:'sachin',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//app.use(formidable());
app.use('/',routes);
server.listen(process.env.PORT||3000,()=>{
   console.log('server started on port 3000'); 
});