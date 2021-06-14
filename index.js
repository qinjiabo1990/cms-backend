require('dotenv').config();
const app = require("./src/app");
const { connectToDB } = require("./src/utils/db");

//.env
const PORT = process.env.PORT || 3000;

connectToDB();

app.listen(PORT, ()=>{
  console.log(`server listening on port ${PORT}`);  
});