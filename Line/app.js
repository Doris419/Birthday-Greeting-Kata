const express = require("express");
const app = express();
const cors = require("cors")
var route = require('./birthday_route.js');

app.use(cors());

app.use(express.static('img'));
app.use("/", route);

app.listen(4000, () => {
    console.log("server started on port 4000");
});

module.exports = app;