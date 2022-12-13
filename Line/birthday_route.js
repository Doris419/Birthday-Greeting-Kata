var router = require('express').Router();
const con = require("./db.js");

router.get("/birthday/v6", function (req, res) {
    let dt = new Date();
    var date = JSON.stringify(dt).substring(6, 11)
    con.query(`SELECT * FROM member WHERE SUBSTR(date_of_birth,6)=?`, {date}, (error, result) => {
        if (error) {
            res.send("No one was born today.");
        }
        var message = "";
        if (result != undefined) {
            for (var i = 0; i < result.length; i++) {
                message +=
                    `<xmp>
                <root>\
                <title>Subject: Happy birthday!</title>\
                <content>Happy birthday, dear ${result[i]["first_name"]}!</content>\
                </root>
                </xmp>`;
            }
            res.send(message);
        }
    })
});

module.exports = router;