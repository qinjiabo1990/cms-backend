const {Schema, model} = require('mongoose');
const Joi = require('joi');

const teacherSchema = new Schema({
    firstName:{
        type: String,
        require: true,
        trim: true
    },
    lastName:{
        type:String,
        require:true,
        trim: true
    },
    email:{
        type: String,
        require:true,
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