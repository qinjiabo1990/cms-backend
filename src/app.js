require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//import router
const router = require(`./routes`);

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


app.listen(PORT, ()=>{
  console.log(`server listening on port ${PORT}`);  
});