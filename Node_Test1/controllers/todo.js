const Todo = require("../models/todo");

exports.addTodo = async (req, res, next) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const isCompleted = false;
    const data = await Todo.create({
      title,
      description,
      isCompleted,
    });
    return res.status(201).json({ data: data });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.getTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findAll();
    return res.status(200).json({
      data: todo,
    });
  } catch (err) {
    return res.status(404).json({
      error: err,
    });
  }
};

exports.delTodo = async (req, res, next) => {
  try {
    const id = req.params.id * 1;
    const data = await Todo.findByPk(id).then((todo) => todo.destroy());
    res.status(200).json({
      data: data,
    });
  } catch (err) {
    return res.status(404).json({
      error: err,
    });
  }
};

exports.patchTodo = async (req, res, next) => {
  try {
    const id = req.params.id * 1;
    let data;
    const result = await Todo.update(
      { isCompleted: true },
      { where: { id: id } }
    ).then(() => Todo.findByPk(id).then((res) => (data = res)));
    return res.status(200).json({
      data: data,
    });
  } catch (err) {
    return res.status(404).json({ error: err });
  }
};
