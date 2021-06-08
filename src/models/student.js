const {Schema} = require('mongoose');
const joi = require('joi');


const schema = new Schema({
    firstName: {
        type: String,
        require: true,
        trim: true, // 去掉空格
        minlength: 2
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        validate: {
            validator: (email) => {
                return !Joi.string().email().validate(email).error; //validate mail by Joi - package
            },
            msg: 'Invalid email format'
        }
    }
});

module.exports = model('Student', schema);