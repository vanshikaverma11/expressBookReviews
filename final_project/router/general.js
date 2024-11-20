const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code herez
  return res.status(300).json({message: "Yet to be implemented"});
});

/// Get the book list available in the shop
public_users.get('/', function (req, res) {
  // Convert the 'books' object to an array and send it as a response
  const bookList = Object.values(books);  // Convert object to an array of book objects
  res.status(300).json(bookList);  // Send the books as a JSON response
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn; // Extract ISBN from the request parameter

  if (books[isbn]) {
    res.status(200).json(books[isbn]); // Correct status code
  } else {
    res.status(404).json({ message: "Book not found" }); // Error message if ISBN not found
  }
});

  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
