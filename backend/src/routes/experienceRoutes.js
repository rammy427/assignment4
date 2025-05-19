const express = require("express");
const expController = require("../controllers/experienceController");
const {validateId, validateUserId} = require("../validations/idValidation");
const {validateExperience} = require("../validations/experienceValidation");
const verifyJWT = require("../middleware/jwt");
const userRemoved = require("../middleware/userRemoved");

const router = express.Router();

router.get("/:userId", validateUserId, expController.getExperiencesByUser);
router.get("/:userId/:id", validateUserId, validateId, expController.getExperienceById);
router.post("/:userId", userRemoved, verifyJWT, validateUserId, validateExperience, expController.addExperienceToUser);
router.put("/:userId/:id", userRemoved, verifyJWT, validateUserId, validateId, validateExperience, expController.updateExperience);
router.delete("/:userId/:id", userRemoved, verifyJWT, validateUserId, validateId, expController.deleteExperience);

module.exports = router;