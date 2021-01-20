
const express = require("express");
const fs = require('fs');
const path = require('path');
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require("./routes/apiRoutes")(app);


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.use(express.static(path.join(__dirname, "public")))


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
