const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose')


app.get('/', (req, res) => {
    res.send('Hello, Node.js!');
}) ;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/books', (req, res) => {
    Book.find().then(books => {
        console.log('All books: ', books);
        res.json(books);
    });
});

app.get('/books/:id', (req, res) => {
    const query = Book.where({ID: parseInt(req.params.id)});
    query.findOne().then(book => {
        if (!book) return res.status(404).send('Book not found.');
        res.send(book);
    });
});

app.use(express.json());

app.post('/books', (req, res) => {
    Book.find().then(books => {
        if (books.length == 0) {
            const newBook = new Book ({
                ID: 1,
                title: req.body.title,
                author: req.body.author,

            });
            newBook.save().then(savedBook => {
                console.log('Book saved:', savedBook);
            });
            res.json(newBook);
        } else {
            const newBook = new Book ({
                ID: books[books.length - 1].ID + 1,
                title: req.body.title,
                author: req.body.author,
            });
            newBook.save().then(savedBook => {
                console.log('Book saved:', savedBook);
            });
            res.json(newBook);
        };
        
    });
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


mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {useNewUrlParser: true, useUnifiedTopology: true});

const bookSchema = new mongoose.Schema({
    ID: Number,
    title: String,
    author: String,
    
});

const Book = mongoose.model('Book', bookSchema);