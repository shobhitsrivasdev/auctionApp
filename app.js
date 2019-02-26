const express= require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const app= express();
mongoose.connect('mongodb://localhost/AuctionDb');
mongoose.Promise=global.Promise;

const routes=require('./routes/api');


app.use(bodyParser.json());
const path=require('path');
const collection="todo";

app.use('/api',routes);


app.use((err,req,res,next)=>{
console.log(err);

res.status(422).send({
   error:err.message
});

});

app.listen(process.env.port || 3000,()=>{
    console.log("conected to databse, app listing to port 3000");
});