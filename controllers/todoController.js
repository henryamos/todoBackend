import Todo from "../models/Todo.js";

//Get all todos
export const getTodos = async (req, res) => {
  const { page = 1, limit = 15, search = "" } = req.query;
  try {
    const todos = await Todo.find({ title: new RegExp(search, "i") })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const count = await Todo.countDocuments({ title: new RegExp(search, "i") });
    res.status(200).json({
      todos,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      message: "Todos fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create a new todo
export const createTodo = async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json({ newTodo, message: "Todo created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Update todo
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (req.body.title != null) todo.title = req.body.title;
    if (req.body.descriptio != null) todo.description = req.body.description;
    if (req.body.dueDate != null) todo.dueDate = req.body.dueDate;
    if (req.body.completed != null) todo.completed = req.body.completed;
    const updatedTodo = await todo.save();
    res.status(200).json({ updatedTodo, message: "Todo updated successfully" });
  } catch (error) {}
};

// Delete todo
export const deleteTodo = async (req, res) => {
  try {
    await Todo.findById(req.params.id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single todo by ID
export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
