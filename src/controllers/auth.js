const User = require('../models/user');
const { generateToken } = require('../utils/jwt');


const login = async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username}).exec();
    if(!user) {
        return res.status(404).json("User is not existed");
    }

  
    const validPassword = await user.validatePassword(password)
    //fail fast 先check error
    if(!validPassword){
        return res.status(404).json('Invalid username or password');
    }
    
    //generate token
    const token = generateToken({id: user._id});

    return res.json({token, username});
}
 
module.exports = {login};