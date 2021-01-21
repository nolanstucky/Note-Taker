//npm to write and read files
const fs = require('fs');
//npm that assigns a unique id when called upon
const uuid4 = require('uuid4');
const notes = [];
//reads the db file when /notes loads
readDbFile();
//app requests for index.js
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

    app.delete("/api/index/:id", (req, res) =>{
        deleteDbFile(req);
        res.send('200');
    })
}
//writes the db.json file with argument data
function writeDbFile(noteInfo){
    fs.writeFile('db/db.json', JSON.stringify(noteInfo, null, 2), (err) => {
        if (err) throw err;
    })
}
//reads the already written db.json file
function readDbFile(){
    fs.readFile('db/db.json', (err, data) =>{
        if (err) throw err;
        let noteInfo = JSON.parse(data);
        noteInfo.forEach(function (note) {
            notes.push(note)
        });
    })
}
//deletes the object with specefic id 
function deleteDbFile(noteInfo){
    fs.readFile('db/db.json',(err, data) => {
        if (err) throw err;
        let deleteNote = noteInfo.params.id;
        let jsonNote = JSON.parse(data);
        console.log(jsonNote);
        jsonNote.forEach((item, i) => {
            if (item.id.includes(deleteNote)){
                jsonNote.splice(i,1)
            }
        });

        writeDbFile(jsonNote);
    })
}
