const express = require("express");
const userController = require("../controllers/userController");
const {validateId} = require("../validations/idValidation");
const {validateUser} = require("../validations/userValidation");
const verifyJWT = require("../middleware/jwt");
const userRemoved = require("../middleware/userRemoved");

const router = express.Router();

router.get("/:id", validateId, userController.getUserById);
router.post("/", userRemoved, validateUser, userController.createUser);
router.put("/:id", userRemoved, verifyJWT, validateId, validateUser, userController.updateUser);
router.delete("/:id", userRemoved, verifyJWT, validateId, userController.deleteUser);

module.exports = router;