const express = require("express");
const edController = require("../controllers/educationController");
const {validateId, validateUserId} = require("../validations/idValidation");
const {validateEducation} = require("../validations/educationValidation");

const router = express.Router();

router.get("/", edController.getEducation);
router.get("/:userId", validateUserId, edController.getEducationByUser);
router.post("/:userId", validateUserId, validateEducation, edController.addEducationToUser);
router.put("/:userId/:id", validateUserId, validateId, validateEducation, edController.updateEducation);
router.delete("/:userId/:id", validateUserId, validateId, edController.deleteEducation);

module.exports = router;