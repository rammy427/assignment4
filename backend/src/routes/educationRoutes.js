const express = require("express");
const edController = require("../controllers/educationController");
const {validateId, validateUserId} = require("../validations/idValidation");
const {validateEducation} = require("../validations/educationValidation");
const verifyJWT = require("../middleware/jwt");

const router = express.Router();

router.get("/degrees", edController.getDegrees);
router.get("/:userId", validateUserId, edController.getEducationByUser);
router.get("/:userId/:id", validateUserId, validateId, edController.getEducationById);
router.post("/:userId", verifyJWT, validateUserId, validateEducation, edController.addEducationToUser);
router.put("/:userId/:id", verifyJWT, validateUserId, validateId, validateEducation, edController.updateEducation);
router.delete("/:userId/:id", verifyJWT, validateUserId, validateId, edController.deleteEducation);

module.exports = router;