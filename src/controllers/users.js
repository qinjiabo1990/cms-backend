const User = require('../models/user');
const { generateToken } = require('../utils/jwt');

const addUser = async (req, res) => {
    const {username, password} = req.body;

    const existingUser = await User.findOne({username}).exec();
    if( existingUser) {
        return res.status(409).json("User already exist");//json:{"error":"User already exist"}; send: "User already exist" 
        //send 可以返回任何格式， json只返回json格式，api里建议用json
    }
    const user = new User({username, password});
    await user.hashPassword();
    await user.save();

    const token = generateToken({id: user._id});
    return res.status(201).json({token, username});
}

module.exports = {addUser};