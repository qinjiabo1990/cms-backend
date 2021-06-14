const {Schema, model} = require(`mongoose`);
const bcrypt = require('bcrypt');


const schema = new Schema({  //schema is Schema
    username:{
        type: String,
        require: true,
        trim: true,
        minlength:2
    },
    password:{
        type: String,
        require: true,
        trim: true
    },
});


//model层面自定义函数
//static method ->作用在 Model.functionName
//instance method ->作用在 document.functionName
schema.methods.hashPassword = async function(){ //hashPassword 是functionName
    this.password = await bcrypt.hash(this.password, 12);
}

schema.methods.validatePassword = async function(password) {
    return bcrypt.compare(password, this.password); //document vs 传进来的
}



module.exports = model('User', schema); 