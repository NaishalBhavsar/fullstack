const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, user: req.user.id });
    await task.save();
    res.status(201).json(task.populate('user', 'name'));
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { search, completed } = req.query; // For search/filter
    let query = { user: req.user.id };
    if (search) query.title = { $regex: search, $options: 'i' };
    if (completed !== undefined) query.completed = completed === 'true';

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
