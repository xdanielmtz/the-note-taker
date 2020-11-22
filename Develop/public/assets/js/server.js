// 1. Require Express
const fs = require("fs");
const express = require("express");
const path = require("path");
// 2. Create an instance of Express
const app = express();
// 3. Set the PORT
const PORT = process.env.PORT || 8080;

// 5. Add middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// VIEW ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"../../index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname,"../../notes.html"));
});


app.get("/api/notes", (req, res) => {
  return res.json(JSON.parse(fs.readFileSync(path.join(__dirname, "../../../../develop/db/db.json"))));
});


// app.get("/api/donuts/:name", (req, res) => {
//   for (let i = 0; i < donuts.length; i++) {
//     if (donuts[i].name === req.params.name) {
//       return res.json(donuts[i]);
//     }
//   }
// });



// 4. Listen on the PORT.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});