const {check, validationResult} = require("express-validator");

exports.validateExperience = [
    check("jobTitle").notEmpty().withMessage("Job title is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
];