const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello, Node.js!');
}) ;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

let books = [
    { id: 1, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling" }, 
    { id: 2, title: "The Hobbit", author: "J.R.R. Tolken" }
];

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found.');

    res.json(book)
});

app.use(express.json());

app.post('/books', (req, res) => {
    const book = {
        id: books.length + 1,
        title: req.body.title,
        autor: req.body.author
    };
    books.push(book);
    res.json(book);
});

app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found.');

    book.title = req.body.title;
    book.author = req.body.author;
    res.json(book);
});

app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send('Book not found.');

    const deletedBook = books.splice(bookIndex, 1);
    res.json(deletedBook);
});

