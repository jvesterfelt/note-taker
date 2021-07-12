const fs = require('fs');
const router = require('express').Router();
const path = require('path');
const { notes } = require('../../db/db.json');
const uniqid = require('uniqid');

function createNewNote(body, notes) {
    console.log('createNewNote', body, notes);
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    return note;
}

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    console.log('notes', notes);
    req.body.id = uniqid();

    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
});

// router.delete('/notes/:id', (req, res) => {
//     const params = [req.params.id];
// });




module.exports = router;