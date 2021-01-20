const fs = require('fs');
const uuid4 = require('uuid4');
const notes = [];

readDbFile();
module.exports = function(app){
    app.get("/api/notes", (req, res) => {
        res.json(notes);
    });

    app.post('/api/index', (req,res) =>{
        req.body.id = uuid4();
        notes.push(req.body)
        writeDbFile(notes);
        res.json(true);
    })
}

function writeDbFile(noteInfo){
    fs.writeFile('db/db.json', JSON.stringify(noteInfo, null, 2), (err) => {
        if (err) throw err;
    })
}

function readDbFile(){
    fs.readFile('db/db.json', (err, data) =>{
        if (err) throw err;
        let noteInfo = JSON.parse(data);
        noteInfo.forEach(function (note) {
            notes.push(note)
        });
    })
}

