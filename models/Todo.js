import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters long"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [5, "Description must be at least 5 characters long"],
  },
  dueDate: {
    type: Date,
    required: [true, "Due date is required"],
    validate: {
      validator: function (value) {
        return value >= new Date();
      },
      message: "Due date must be in the future",
    },
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Todo", todoSchema);

