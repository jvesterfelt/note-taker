const fs = require('fs');
const router = require('express').Router();
const path = require('path');
const notes = require('../../db/db.json');

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
    console.log('notes:', notes);
    res.json(notes);
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    const newNote = createNewNote(req.body, notes);
    res.json(newNote);

    console.log('newNote', newNote);
});

// router.delete('/notes/:id', (req, res) => {
//     const params = [req.params.id];
// });




module.exports = router;