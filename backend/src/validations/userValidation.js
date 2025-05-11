const {check, validationResult} = require("express-validator");

exports.validateUser = [
    check("firstName").notEmpty().withMessage("Name is required"),
    check("lastName").notEmpty().withMessage("Last name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").notEmpty().withMessage("Password is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
];