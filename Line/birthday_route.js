var router = require('express').Router();
const con = require("./db.js");

router.get("/birthday/v4", function (req, res) {
    let dt = new Date();
    var date = JSON.stringify(dt).substring(6, 11)
    con.query(`SELECT * FROM member WHERE SUBSTR(date_of_birth,6)=?`, {date}, (error, result) => {
        if (error) {
            res.send("No one was born today.");
        }
        var message = [];
        var title = "";
        var content = "";
        if (result != undefined) {
            for (var i = 0; i < result.length; i++) {
                title = `Subject: Happy birthday!`
                content = `Happy birthday, dear ${result[i]["last_name"]},${result[i]["first_name"]}!`
                var msg = {
                    title,
                    content
                }
                message.push(msg)
            }
            res.send(message);
        }
    })
});

module.exports = router;