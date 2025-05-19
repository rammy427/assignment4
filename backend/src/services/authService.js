require("dotenv").config();
const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../models/userModel");
const bcrypt = require('bcrypt');

exports.loginHandler = async (req, res) =>
{
    const {email, password} = req.body;
    const user = await getUserByEmail(email);
    try
    {
        const passwordMatched = await bcrypt.compare(password, user.Password);
        if (user.Email !== email || !passwordMatched)
            throw new Error("Invalid credentials");
        const payload = {id: user.Id, email: user.Email, role: user.Role};
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
        res.status(200).json({token: token});
    }
    catch (error)
    {
        res.status(401).json({message: "Error", error: error.message});
    }
}