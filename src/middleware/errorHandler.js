module.exports = (error, req, res, next) => {
    if(error.name === 'ValidationError'){
        if(process.env.NODE_ENV === 'production'){
            const {details}= error;
            const errMsg = details.map((i)=>({
                message: i.message
            }));
            return res.status(400).json(errMsg);
        }else{
            return res.status(400).json(error);
        }
    }
    //catch other errors


    //大的error handler拆分小的errorhandler

    //尽量不要返回5开头的error info
    //用winston记录到log
    return res.json(500).send('something unexpected happened, please try again later');
}

//if (error instanceof CustomError) {}
class CustomError extends Error{

}