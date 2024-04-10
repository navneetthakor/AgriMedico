// here we are collecting details from token that we asigned while Customer account creation or login
// so we required jsonwebtoken 
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

const fetchCustomer = async (req,res,next) =>{
    try{

    // get token from request header 
    const token = req.header('usertoken');
    if(!token){
       return res.status(401).json({error: "please login with valid authenticaiton token", signal: 'red'});
    }

    // collect data from authentication token 
    const data = jwt.verify(token, jwt_secret);
    req.user = data.user;

    // call actual function associated with it 
    next();

    }catch(e){
        console.log(e);
        res.status(500).json({error:"some error occured", signal: 'red'});
    }
}

module.exports = fetchCustomer;