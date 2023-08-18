const express = require("express");

const expenseController = require("../controllers/expense");

const router = express.Router();

router.get("/getExpense", expenseController.getAllExpense);

router.post("/addExpense", expenseController.addExpense);

router.delete("/delete_expense/:id", expenseController.deleteExpense);

module.exports = router;
