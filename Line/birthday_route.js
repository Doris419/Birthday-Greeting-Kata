var router = require('express').Router();
const con = require("./db.js");

router.get("/birthday/v3", function (req, res) {
    con.query(`SELECT * FROM member WHERE FLOOR(DATEDIFF(now(), date_of_birth)/365.25) >= 49`, (error, result) => {
        if (error) {
            res.send("No one was born today and is older than 49 years old.");
        }
        var message = [];
        var title = "";
        var content = "";
        var pic = "";
        if (result != undefined) {
            for (var i = 0; i < result.length; i++) {
                title = `Subject: Happy birthday!`
                content = `Happy birthday, dear ${result[i]["first_name"]}!`
                pic = `/birthday.jpg`
                var msg = {
                    title,
                    content,
                    pic
                }
                message.push(msg)
            }
            res.send(message);
        }
    })
});

module.exports = router;