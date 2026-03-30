const express = require('express');
const router = express.Router();
const Attendant = require('../models/Attendant');

router.get('/', async (req, res) => {
    try {
        const attendants = await Attendant.find();
        res.json(attendants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const attendant = await Attendant.findById(req.params.id);
        if (!attendant) return res.status(404).json({ message: "Attendant not found" });
        res.json(attendant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/', async (req, res) => {
    try {
        const attendant = new Attendant(req.body);
        const saved = await attendant.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
