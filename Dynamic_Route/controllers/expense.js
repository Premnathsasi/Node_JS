const Expense = require("../models/expense");

exports.addExpense = async (req, res, next) => {
  try {
    const price = req.body.price;
    const product = req.body.product;
    const category = req.body.category;
    const data = await Expense.create({
      price: price,
      product: product,
      category: category,
    });
    return res.status(201).json({
      newExpense: data,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.getAllExpense = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();
    return res.status(200).json({
      allExpense: expenses,
    });
  } catch (err) {
    return res.status(404).json({
      error: err,
    });
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const id = req.params.id * 1;
    const data = await Expense.findByPk(id).then((expense) =>
      expense.destroy()
    );
    return res.status(200).json({
      result: data,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
