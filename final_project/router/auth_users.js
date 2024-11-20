const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  {
    username: "john_doe",
    password: "password123", 
  },
  {
    username: "alice_smith",
    password: "securepassword",
  },
];
const SECRET_KEY = "yourSecretKey";

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;  // Extract username and password from the request body

  // Step 1: Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Both username and password are required." });
  }

  // Step 2: Validate username existence
  if (!isValid(username)) {
    return res.status(400).json({ message: "Username does not exist." });
  }

  // Step 3: Validate password correctness
  if (!authenticatedUser(username, password)) {
    return res.status(400).json({ message: "Invalid password." });
  }

  // Step 4: Generate a JWT token upon successful login
  const payload = { username };  // You can add more details in the payload if necessary
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });  // Token expires in 1 hour

  // Step 5: Respond with the generated token
  return res.status(200).json({
    message: "Login successful",
    token: token,  // Send the JWT token to the client
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
