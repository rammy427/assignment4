const express = require("express");
const pController = require("../controllers/portfolioController");
const {validateUserId} = require("../validations/idValidation");

const router = express.Router();

router.get("/:userId", validateUserId, pController.getPortfolioByUser);

module.exports = router;