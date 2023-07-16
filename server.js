const express= require('express');
const app= express();
const portConfig= require('./configs/server.config');
const dbConfig= require('./configs/db.configs');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//Allowing CORS: cross-origin Resource Sharing
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

mongoose.connect(dbConfig.DB_URL);
const db= mongoose.connection;

db.once("open",()=>{
    console.log("successfully connected to mongoDb") 
})
db.on('error',()=>{
   console.log("error while connecting to mongoDb");
   process.exit(); //kill the process and check the error; 
})

require ('./routes/auth.route')(app);
require ('./routes/users.route')(app);
require ('./routes/ticket.route')(app);




app.listen(portConfig.PORT,()=>{
    console.log(`server is up and running on ${portConfig.PORT}`);
})