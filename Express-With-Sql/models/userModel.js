const db = require('../config/db');

const User = {
  getAllUsers: (callback) => {
    const query = "SELECT * FROM user";
    db.query(query, (err, results) => {
      callback(err, results);
    });
  },

  createUser: (userData, callback) => {
    const query = "INSERT INTO user (id, name, favorite) VALUES (?, ?, ?)";
    db.query(query, [userData.id, userData.name, userData.favorite], (err, results) => {
      callback(err, results);
    });
  }
};

module.exports = User;
