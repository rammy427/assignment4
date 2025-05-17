const express = require("express");
const skillController = require("../controllers/skillController");
const {validateId, validateUserId} = require("../validations/idValidation");
const {validateSkill} = require("../validations/skillValidation");

const router = express.Router();

router.get("/:userId", validateUserId, skillController.getSkillsByUser);
router.post("/:userId", validateUserId, validateSkill, skillController.addSkillToUser);
router.put("/:userId/:id", validateUserId, validateId, validateSkill, skillController.updateSkill);
router.delete("/:userId/:id", validateUserId, validateId, skillController.deleteSkill);

module.exports = router;