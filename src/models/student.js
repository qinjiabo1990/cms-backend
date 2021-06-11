// const {Schema} = require('mongoose');
// const joi = require('joi');


// const schema = new Schema({
//     firstName: {
//         type: String,
//         require: true,
//         trim: true, // 去掉空格
//         minlength: 2
//     },
//     lastName: {
//         type: String,
//         require: true,
//     },
//     email: {
//         type: String,
//         require: true,
//         validate: {
//             validator: (email) => {
//                 return !Joi.string().email().validate(email).error; //validate mail by Joi - package
//             },
//             msg: 'Invalid email format'
//         }
//     }
// });

// module.exports = model('Student', schema);

const Joi = require('joi'); //about validation
const { Schema, model } = require('mongoose');

const schema = new Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
        minlength: 2
    },
    lastName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        validate: {
            validator: (email) => {
                return !Joi.string().email().validate(email).error;
            },
            msg: 'Invalid email format',
        }
    },
    courses: [{ type: String, ref: 'Course' }] //ref 里边写model注册的名字
}, {
    timestamps: true,
})

module.exports = model('Student', schema);