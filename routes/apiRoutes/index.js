const fs = require('fs');
const router = require('express').Router();
const path = require('path');
const { notes } = require('../../db/db.json');
const uniqid = require('uniqid');

function createNewNote(body, notes) {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    return note;
}

function deleteNote(id, notes) {
    const index = notes.indexOf(id);
    notes.splice(index, 1);

    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    )
    return notes;
}

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    req.body.id = uniqid();

    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
});

router.delete('/notes/:id', (req, res) => {
    const deletedNote = deleteNote([req.params.id], notes);
    res.json(notes);
});


module.exports = router;