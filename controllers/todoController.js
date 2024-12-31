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
    const { title, description, dueDate, completed } = req.body;
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Update fields only if they are provided in the request
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (dueDate !== undefined) todo.dueDate = dueDate;
    if (completed !== undefined) todo.completed = completed;

    const updatedTodo = await todo.save();
    res.status(200).json({ updatedTodo, message: "Todo updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({
      message: `Todo '${todo.title}' (ID: ${todo._id}) deleted successfully`,
    });
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
