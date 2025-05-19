const { getUserById } = require("../models/userModel");

async function userRemoved(req, res, next)
{
    const user = await getUserById(159);
    if (user.Deleted)
        return res.status(404).json({message: "User has been removed."});
    next();
}

module.exports = userRemoved;