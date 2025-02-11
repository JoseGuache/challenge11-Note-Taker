const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

//http://localhost:3001/api/notes/
router.get("/", (req, res) => {

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).json(err)
        }

        const notes = JSON.parse(data)

        res.json(notes)

    })
})

//Post request reference week 11 mini project in routes->tips.js
router.post('/', (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        // Read existing notes
        const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
        // Add new note
        notes.push(newNote);
        // Write back to file
        fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 2));

        res.json(`Note added successfully`);
    } else {
        res.status(500).json('Error in adding note');
    }
});

module.exports = router;