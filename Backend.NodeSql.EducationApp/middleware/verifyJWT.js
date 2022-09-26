const jwt = require('jsonwebtoken');
require('dotenv').config();
const ServiceResult = require('../models/serviceResult.model');


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        ServiceResult.Message = "Unauthorized!";
        ServiceResult.Description = "Request access denied ? Token validation has failed!";
        ServiceResult.Result = false;
        ServiceResult.Data = null;
       
        return res.send(ServiceResult);
    }
    //console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                ServiceResult.Message = "Invalid Token!";
                ServiceResult.Description = "Request access denied ? Token validation has failed!";
                ServiceResult.Result = false;
                ServiceResult.Data = null;
                
                return res.send(ServiceResult);
            }
            req.user = decoded.username;
            next();
        }
    );
}

module.exports = verifyJWT