const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.post('/', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const books = await Book.find()
            .populate('authors')
            .populate('borrowedBy')
            .populate('issuedBy');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate('authors')
            .populate('borrowedBy')
            .populate('issuedBy');
        
        if (!book) return res.status(404).json({ message: "Book not found" });
        
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('authors');
        
        if (!updatedBook) return res.status(404).json({ message: "Book not found" });
        
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: "Book not found" });
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/:id/borrow', async (req, res) => {
    try {
        const { studentId, attendantId, returnDate } = req.body;
        
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        if (book.status === 'OUT') return res.status(400).json({ message: "Book is already borrowed" });
        
        book.status = 'OUT';
        book.borrowedBy = studentId;
        book.issuedBy = attendantId;
        book.returnDate = returnDate;
        
        await book.save();
        await book.populate('authors borrowedBy issuedBy');
        
        res.status(200).json({ message: "Book borrowed successfully", book });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/:id/return', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        if (book.status === 'IN') return res.status(400).json({ message: "Book is already available" });
        
        book.status = 'IN';
        book.borrowedBy = null;
        book.issuedBy = null;
        book.returnDate = null;
        
        await book.save();
        await book.populate('authors');
        
        res.status(200).json({ message: "Book returned successfully", book });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
