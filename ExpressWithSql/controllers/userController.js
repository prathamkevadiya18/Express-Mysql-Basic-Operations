const User = require('../models/userModel');

exports.getUsers = (req, res) => {
  User.getAllUsers((err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
};

exports.addUser = (req, res) => {
  const { id, name, favorite } = req.body;
  if (!id || !name || !favorite) {
    return res.status(400).json({ error: "Please provide id, name, and favorite fields." });
  }

  User.createUser({ id, name, favorite }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create user" });
    }
    res.status(201).json({ message: "User created successfully", userId: id });
  });
};
