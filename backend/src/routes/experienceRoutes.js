const express = require("express");
const expController = require("../controllers/experienceController");
const {validateId, validateUserId} = require("../validations/idValidation");
const {validateExperience} = require("../validations/experienceValidation");

const router = express.Router();

router.get("/:userId", validateUserId, expController.getExperiencesByUser);
router.get("/:userId/:id", validateUserId, validateId, expController.getExperienceById);
router.post("/:userId", validateUserId, validateExperience, expController.addExperienceToUser);
router.put("/:userId/:id", validateUserId, validateId, validateExperience, expController.updateExperience);
router.delete("/:userId/:id", validateUserId, validateId, expController.deleteExperience);

module.exports = router;