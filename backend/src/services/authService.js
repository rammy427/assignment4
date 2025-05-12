require("dotenv").config();
const jwt = require("jsonwebtoken");
// Login model referenced here.

exports.loginHandler = async (req, res) =>
{
    const {email, password} = req.body;
    const user =
    {
        id: 159,
        email: "sebastian.ramirez4@upr.edu",
        password: "0101010101",
        role: "API Destroyer"
    }
    try
    {
        if (user.email !== email || user.password !== password)
            throw new Error("Invalid credentials");
        const payload = {id: user.id, email: user.email, role: user.role};
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
        res.status(200).json({token: token});
    }
    catch (error)
    {
        res.status(401).json({message: "Error", error: error.message});
    }
}