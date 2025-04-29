import Task from "../models/Task.js";

// Get all tasks for the logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching tasks" });
  }
};

// Get a single task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching task" });
  }
};

// Create a new task
// export const createTask = async (req, res) => {
//     try {
//   const { taskName, description, dueDate } = req.body;
//   if (!taskName || !dueDate) return res.status(400).json({ msg: "Task name and due date are required" });
//     const newTask = await Task.create({
//       userId: req.user.id,
//       taskName,
//       description,
//       dueDate,
//     });
//     console.log('✅ Task saved in DB:---------------');
//     res.status(201).json(newTask);
//   } catch (err) {
//     res.status(500).json({ msg: "Error creating task" });
//   }
// };

export const createTask = async (req, res) => {
    try {
      const { taskName, description, dueDate } = req.body;
  
      if (!taskName || !dueDate) {
        return res.status(400).json({ msg: "Task name and due date are required" });
      }
  
      const newTask = await Task.create({
        userId: req.user.id, // assuming auth middleware sets req.user
        taskName,
        description,
        dueDate,
      });
  
      console.log('Task saved in DB:', newTask);
  
      res.status(201).json(newTask);
    } catch (err) {
      console.error('❌ Error while creating task:', err);
      res.status(500).json({ msg: "Error creating task" });
    }
  };
  

// Update an existing task
export const updateTask = async (req, res) => {
  const { taskName, description, dueDate } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { taskName, description, dueDate },
      { new: true }
    );
    if (!task) return res.status(404).json({ msg: "Task not found or unauthorized" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error updating task" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deleted) return res.status(404).json({ msg: "Task not found or unauthorized" });
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting task" });
  }
};
