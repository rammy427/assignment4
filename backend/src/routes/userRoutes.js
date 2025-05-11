const express = require("express");
const userController = require("../controllers/userController");
const {validateId} = require("../validations/idValidation");
const {validateUser} = require("../validations/userValidation");

const router = express.Router();

router.get("/:id", validateId, userController.getUserById);
router.post("/", validateUser, userController.createUser);
router.put("/:id", validateId, validateUser, userController.updateUser);
router.delete("/:id", validateId, userController.deleteUser);

module.exports = router;