require('dotenv').config();
const express = require('express');
require('express-async-errors');

const morgan = require('morgan');
const cors = require('cors');

//import router
const router = require(`./routes`);
const {connectToDB} = require('./utils/db');
const errorHandler = require('./middleware/errorHandler');

//自己家winston, helmet

//.env
const PORT = process.env.PORT || 3000;

const app = express();

//set morgan
const morganLog = process.env.NODE_ENV === 'production' ? morgan('common') : morgan('dev'); //通过env来告诉morgan现在的环境是什么
app.use(morganLog);
app.use(cors());

//router
app.use(express.json());
app.use('/api', router);

//error handler - 可查看express官方文件
app.use(errorHandler);

connectToDB(); 


app.listen(PORT, ()=>{
  console.log(`server listening on port ${PORT}`);  
});