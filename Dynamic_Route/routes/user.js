const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.post("/adduser", userController.addUser);

router.get("/getusers", userController.getUsers);

router.delete("/delete-user/:id", userController.deleteUser);

module.exports = router;
