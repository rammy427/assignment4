const {check, validationResult} = require("express-validator");

exports.validateId = [
    check("id").isNumeric().withMessage("ID must be a number"),
    (req, res, next) =>
    {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        next();
    }
];

exports.validateUserId = [
    check("userId").isNumeric().withMessage("User ID must be a number"),
    (req, res, next) =>
    {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        next();
    }
];