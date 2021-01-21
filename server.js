//require all npm packages needed
const express = require("express");
const fs = require('fs');
const path = require('path');
const app = express();

//Sets up inital port
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//using apiRoutes.js for api requests
require("./routes/apiRoutes")(app);

//html get requests for main page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//html get request for note page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});
//using cs and js files
app.use(express.static(path.join(__dirname, "public")))

//listen request for the app to function
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
