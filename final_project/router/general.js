const express = require('express');
const books = require('./booksdb.js');  // CommonJS syntax
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code herez
  return res.status(300).json({message: "Yet to be implemented"});
});

/// Get the book list available in the shop
public_users.get('/', function (req, res) {
  const bookList = books;  // Convert object to an array of book objects
  res.status(200).json(bookList);  // Send the books as a JSON response
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;  // Get ISBN from request parameters
  
  // Find the book with the matching ISBN
  const book = Object.values(books).find(b => b.isbn === isbn);  // Search books array by ISBN property
  
  if (book) {
    res.status(200).json(book);  // Return book details if found
  } else {
    res.status(404).json({ message: 'Book not found' });  // Return 404 if no book found with the given ISBN
  }
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  // Retrieve the author from the request parameters
  const author = req.params.author.toLowerCase();  // Convert to lowercase for case-insensitive matching
  
  // Find books whose author matches the provided name
  const matchingBooks = Object.values(books).filter(b => b.author.toLowerCase() === author);

  // If matching books are found, return them
  if (matchingBooks.length > 0) {
    res.status(200).json(matchingBooks);
  } else {
    // If no books match the author, return a message indicating that
    res.status(404).json({ message: 'No books found by this author' });
  }
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
