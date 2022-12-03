if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
}
const express = require('express');
const app = express();
const expLay = require('express-ejs-layouts');
const router = require('./routes/index');
const path = require('path');




app.set('views',path.resolve(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(expLay);
app.use(express.static('public'))

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true});

const db = mongoose.connection
db.on('error', error => {
    console.error(error);
})
db.once('open',()=>console.log('connected to mongoose'))


app.use('/', router);



app.listen(process.env.PORT || 3000);
