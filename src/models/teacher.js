const {Schema, model} = require('mongoose');
const Joi = require('joi');

const teacherSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type: String,
        required:true,
        validate: {
            validator: (email) => {
                return !Joi.string().email().validate(email).error;
            },
            msg: 'Invalid email format',
        }
    },
    courses:[{
        type: String,
        ref: 'Course'
    }]
},{
    timestamps: true
})

module.exports = model("Teacher", teacherSchema);