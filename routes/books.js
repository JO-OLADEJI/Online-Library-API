const express = require('express');
const router = express.Router();
const Book = require('../models/bookSchema.js');
const { validateBook } = require('../helper_functions/validate.js');




router.get('/', async (req, res) => {
  try {
    const allBooks = await Book.find();
    res.json(allBooks);
  }
  catch(error) {
    res.send(error);
  }
});




router.get('/:id', async (req, res) => {
  try {
    const requestedBook = await Book.findById(req.params.id);
    if (!requestedBook) return res.status(400).send('Resource not found !');
    res.json(requestedBook);
  }
  catch(error) {
    res.send('Error 400: Resource not found !');
  }
});




router.post('/', async (req, res) => {
  const { error, value } = validateBook(req.body);
  if (error) return res.send(error.details[0].message);

  try {
    const newBook = new Book({
      name: value.name,
      genre: value.genre,
      author: value.author,
      year: value.year,
      rating: value.rating
    });
    const saved = await newBook.save();
    res.send(`${saved.name} by ${saved.author} has been added to the Library.`);
  }
  catch(error) {
    res.send('An error occured while adding book to Library !');
  }
});




router.put('/:id', async (req, res) => {
  try {
    const requestedBook = await Book.findById(req.params.id);
    if (!requestedBook) return res.status(400).send('Resource not found !');
    const { error, value } = validateBook(req.body);
    if (error) return res.send(error.details[0].message);

    const updated = await Book.updateOne(
      { _id: req.params.id }, 
      { $set: {
        name: value.name,
        genre: value.genre,
        author: value.author,
        year: value.year,
        rating: value.rating
      }}
    );
    res.send(`${requestedBook.name} by ${requestedBook.author} has been updated.`);
  }
  catch(error) {
    res.send('Error 400: Resource not found !');
  }
});




router.delete('/:id', async (req, res) => {
  try {
    const requestedBook = await Book.findById(req.params.id);
    if (!requestedBook) return res.status(400).send('Resource not found !');
    const deleted = await Book.deleteOne({ _id: req.params.id });
    res.send(`${requestedBook.name} by ${requestedBook.author} has been deleted from the Library.`);
  }
  catch(error) {
    res.send('Error 400: Resource not found !');
  }
});




module.exports = router;