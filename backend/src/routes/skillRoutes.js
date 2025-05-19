const express = require("express");
const skillController = require("../controllers/skillController");
const {validateId, validateUserId} = require("../validations/idValidation");
const {validateSkill} = require("../validations/skillValidation");
const verifyJWT = require("../middleware/jwt");
const userRemoved = require("../middleware/userRemoved");

const router = express.Router();

router.get("/:userId/:id", validateUserId, validateId, skillController.getSkillById);
router.get("/:userId", validateUserId, skillController.getSkillsByUser);
router.post("/:userId", userRemoved, verifyJWT, validateUserId, validateSkill, skillController.addSkillToUser);
router.put("/:userId/:id", userRemoved, verifyJWT, validateUserId, validateId, validateSkill, skillController.updateSkill);
router.delete("/:userId/:id", userRemoved, verifyJWT, validateUserId, validateId, skillController.deleteSkill);

module.exports = router;