const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req,res,next) => {
    try {
        const header = req.headers.authorization;
        if(!header || !header.startsWith('Bearer ')) return res.status(401).json({success: false,error: 'No token found'});
        
        const token = header.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({success: false,error: "Invalid or expired token"})
    }
};

module.exports = {auth};