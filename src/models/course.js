const {Schema, model} = require(`mongoose`)
//OR const mongoose = require(`mongoose`);


const schema = new Schema({
    _id: { //id is course code
        type: String,
        uppercase: true,
        alias: 'code' //告诉mongoose这就是id快捷方式， 有这个就不用下边的schema.virtual code了
    },
    name:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        default: 'This is a description'
    },
    __v:{
        type: Number,
        select: false //不返回
    },
    students:[{
        type: Schema.Types.ObjectId, //如果是默认的id，应该是这个，注意objectid是mongodb独有，并在在js里
        ref: 'Student'
    }]
}, {
    timestamps:true,
    // toJSON:{
    //     virtuals: true //用于下边的virtual
    // },
    id: false
})

//express id is course code
//example: fname + lname
// schema.virtual('code').get(function(){  //不用arrow function的原因是，里边的this 是指向获取的document
//     return this._id;
// })

module.exports = model('Course', schema); //Course: 1. change to 'courses' and save in mongoDB. 2. using 'Course' to find model in mongoose 
//OR const courseModel = model('Course', schema);