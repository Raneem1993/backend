const dotenv = require('dotenv');
dotenv.config();


const express = require("express");
const cors = require("cors");
const roomRouter = require('./routers/room.router');
const userRouter = require('./routers/user.router');
const orderRouter = require('./routers/order.router');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);






 const app = express();
 app.use(express.json());


 app.use(cors({
     credentials:true,
     origin:["http://localhost:4200"]
 }));


 

 app.use("/api/rooms", roomRouter);
 app.use("/api/users", userRouter);
 app.use("/api/orders", orderRouter);

 
 

 

 app.use(express.static('public'));
 app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname,'public', 'index.html'))
 })


 const port = process.env.PORT || 3100;
 app.listen(port,()=>{
     console.log("Webseite served on http://localhost" + port);
 })

 mongoose.connect( process.env.DB_CONNECTION,{ dbName: process.env.DB_NAME })

const db = mongoose.connection;
db.on('error', err=>{
    console.log(err);
});
db.once('open', ()=>{
    console.log('connected to DB')
});
