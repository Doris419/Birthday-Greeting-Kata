var router = require('express').Router();
const con = require("./db.js");

router.get("/birthday/v5", function (req, res) {
    let dt = new Date();
    var date = JSON.stringify(dt).substring(6, 11);
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/line";
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("line");
        var whereStr = { "date_of_birth": { $regex: new RegExp(date) } };
        dbo.collection("member").find(whereStr).toArray(function (err, result) {
            if (err) throw err;
            var message = [];
            var title = "";
            var content = "";
            if (result != undefined) {
                for (var i = 0; i < result.length; i++) {
                    title = `Subject: Happy birthday!`
                    content = `Happy birthday, dear ${result[i]["first_name"]}!`
                    var msg = {
                        title,
                        content
                    }
                    message.push(msg)
                }
                res.send(message);
            }
            db.close();
        });
    });
});

module.exports = router;