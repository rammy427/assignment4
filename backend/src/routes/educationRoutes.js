const express = require("express");
const edController = require("../controllers/educationController");
const {validateId, validateUserId} = require("../validations/idValidation");
const {validateEducation} = require("../validations/educationValidation");
const verifyJWT = require("../middleware/jwt");
const userRemoved = require("../middleware/userRemoved");

const router = express.Router();

router.get("/degrees", edController.getDegrees);
router.get("/:userId", validateUserId, edController.getEducationByUser);
router.get("/:userId/:id", validateUserId, validateId, edController.getEducationById);
router.post("/:userId", userRemoved, verifyJWT, validateUserId, validateEducation, edController.addEducationToUser);
router.put("/:userId/:id", userRemoved, verifyJWT, validateUserId, validateId, validateEducation, edController.updateEducation);
router.delete("/:userId/:id", userRemoved, verifyJWT, validateUserId, validateId, edController.deleteEducation);

module.exports = router;