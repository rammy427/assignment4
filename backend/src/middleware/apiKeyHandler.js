require("dotenv").config();

async function checkApiKey(req, res, next)
{
    let apiKey = process.env.API_KEY;
    const srcKey = req.get("Api-Key");
    if (apiKey != srcKey)
        return res.status(403).json({message: "Invalid API key."});
    next();
}

module.exports = checkApiKey;