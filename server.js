// 1. Require Express
const fs = require("fs");
const express = require("express");
const path = require("path");
const db = require("./db/db.json")
// 2. Create an instance of Express
const app = express();
// 3. Set the PORT
const PORT = process.env.PORT || 8080;
const notes = db
// 5. Add middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// VIEW ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname,"./public/notes.html"));
});


app.get("/api/notes", (req, res) => {
  return res.json(JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json"))));
});

app.post("/api/notes", (req, res) => {
  console.log(req.body)
  req.body["id"] = notes.length+1
  notes.push(req.body)
  fs.writeFile("./db/db.json", JSON.stringify(notes), "utf-8", (err) => {
    if (err) throw err;
    return res.json(req.body);
  })
})

app.delete("/api/notes/:id", (req, res) => {
  let deletedItem = req.params.id
  fs.readFile("./db/db.json", (err, data) => {
    let history = JSON.parse(data);
    for( i=0; i<notes.length; i++){
      if(deletedItem == history[i].id){
        notes.splice(i, 1)

        fs.writeFile("./db/db.json", JSON.stringify(notes), "utf-8", (err) => {
          if (err) throw err;
          return;
        })
      }
    }
  })
  res.end()
})



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