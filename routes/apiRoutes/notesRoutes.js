const router = require('express').Router();
const { getNotes, saveNote, deleteNote } = require('../htmlRoutes/index');
const { notes } = require('../../db/db.json');

router.get('/notes', (req, res) => {
    let result = notes;
    if (!req.body) {
        res.status(404);
    }
    res.json(result);
});

router.post('/notes', (req, res) => {});




module.exports = router;