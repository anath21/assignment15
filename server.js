const express = require("express");
const path = require('path');
const app = express();
const craftsData = require('./public/crafts.json');


app.use(express.static(path.join(__dirname, 'public')));

app.use('/images', express.static(path.join(__dirname, 'public/crafts')));

app.get("/api/crafts", (req,res) => {
    console.log("Someone is requesting our API");
    res.json(craftsData);
});

app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});
