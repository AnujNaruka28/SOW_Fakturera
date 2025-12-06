const prisma = require("../models/prismaClient"); 
const {comparePassword} = require("../utils/hash");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req,res) => {
    try {
        const {email,password} = req.body;
        
        const user = await prisma.user.findUnique({
            where: {email: email}
        });

        if(!user) return res.status(404).json({success: false,error: "User Not Found"});

        try {
            if(!(await comparePassword(password,user.password))) {
                return res.status(401).json({success: false,error: "Invalid Password"});
            } else {
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                    company: user.company
                }, process.env.JWT_SECRET, {
                    expiresIn: '12h'
                });

                return res.status(200).json({
                    success: true,
                    message: "Login Successful",
                    data: token
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in bcrypt comparision",
                error: err
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error in login the user",
            error: err
        });
    }
}

module.exports = login;