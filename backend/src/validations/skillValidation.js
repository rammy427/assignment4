const {check, validationResult} = require("express-validator");

exports.validateSkill = [
    check("name").notEmpty().withMessage("Name is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
];