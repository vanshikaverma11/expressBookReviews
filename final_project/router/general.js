const express = require('express');
const books = require('./booksdb.js');  // CommonJS syntax
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  // Extract the username and password from the request body
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Both username and password are required" });
  }

  // Check if the username already exists
  if (users[username]) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Add the new user to the 'users' object
  users[username] = { password: password };

  // Return a success response with the new user
  return res.status(201).json({ message: "User successfully registered", user: { username } });
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


// Get book details based on title
public_users.get('/title/:title', function (req, res) {
  // Retrieve the title from the request parameters
  const title = req.params.title.toLowerCase();  // Convert to lowercase for case-insensitive matching
  
  // Find books whose title matches the provided title
  const matchingBooks = Object.values(books).filter(b => b.title.toLowerCase().includes(title));

  // If matching books are found, return them
  if (matchingBooks.length > 0) {
    res.status(200).json(matchingBooks);
  } else {
    // If no books match the title, return a message indicating that
    res.status(404).json({ message: 'No books found with this title' });
  }
});


// Get book review based on ISBN
public_users.get('/review/:isbn', function (req, res) {
  // Retrieve the ISBN from the request parameters
  const isbn = req.params.isbn;

  // Find the book with the matching ISBN
  const book = (books).find(b => b.isbn === isbn);

  // If the book is found, check if it has reviews and return them
  if (book) {
    // If the book has reviews, return them
    if (Object.keys(book.reviews).length > 0) {
      res.status(200).json(book.reviews);
    } else {
      // If no reviews are found, return a message indicating that
      res.status(404).json({ message: 'No reviews available for this book' });
    }
  } else {
    // If the book is not found, return a "Book not found" message
    res.status(404).json({ message: 'Book not found' });
  }
});


module.exports.general = public_users;
