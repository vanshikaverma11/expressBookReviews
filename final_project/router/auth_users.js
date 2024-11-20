const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  // Example user with bcrypt hashed password
  {
    username: "testuser",
    password: "$2a$10$T5vj/lF.3lQuqLtiijABmuW7yS8d92Yw.gjdgFcTr2Ntn5L.7OXhG" // Example bcrypt hashed password
  }
];

const SECRET_KEY = process.env.SECRET_KEY || "b913ca1389001sfc576c38f139f257ed4294a06941d9763aa8d2b21e0b568846f4fbf6e0c40606da4cc1402e4357f7c72426c99e4d627cb801f50bcb04bf0e7a6"; // The secret key for JWT

// Check if the username is valid
const isValid = (username) => {
  return users.some(user => user.username === username);
};

// Check if the user credentials match
const authenticatedUser = (username, password) => {
  const user = users.find(user => user.username === username);
  return user && bcrypt.compareSync(password, user.password); // Check hashed password
};

// Login route for registered users
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  if (!isValid(username)) {
    return res.status(404).json({ message: "Username does not exist. Register first." });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid password. Try again." });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  req.session.authorization = { accessToken: token };

  return res.status(200).json({
    message: "Login successful.",
    token: token
  });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
