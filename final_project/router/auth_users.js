const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  { username: "user1", password: "pass1" },
  { username: "user2", password: "pass2" },
];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}


const authenticatedUser = (username, password) => {
  // Check if the username and password match any record in the users array
  const userMatch = users.find(
    (user) => user.username === username && user.password === password
  );
  return !!userMatch; // Returns true if username and password match, otherwise false
};

module.exports = { authenticatedUser };

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn; // Extract ISBN from the route parameter
  const { review } = req.body; // Extract review from the request body
  const username = req.session.username; // Get the username from session (assumes session is set up)

  // Check if the book exists
  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Check if the review is provided
  if (!review) {
    return res.status(400).json({ message: "Review content is missing" });
  }

  // Add or update the review for the user
  if (!books[isbn].reviews) {
    books[isbn].reviews = {}; // Initialize reviews object if not present
  }

  books[isbn].reviews[username] = review; // Update review for the logged-in user

  return res.status(200).json({ message: "Review added/updated successfully", reviews: books[isbn].reviews });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
