const express = require("express");

const todoController = require("../controllers/todo");

const router = express.Router();

router.post("/postTodo", todoController.addTodo);

router.get("/getTodo", todoController.getTodo);

router.delete("/deleteTodo/:id", todoController.delTodo);

router.patch("/updateTodo/:id", todoController.patchTodo);

module.exports = router;
