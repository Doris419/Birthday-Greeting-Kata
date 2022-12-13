var router = require('express').Router();
const con = require("./db.js");

router.get("/birthday/v2", function (req, res) {
    let dt = new Date();
    var date = JSON.stringify(dt).substring(6, 11);
    con.query(`SELECT * FROM member WHERE SUBSTR(date_of_birth,6)=?`, {date}, (error, result) => {
        if (error) {
            res.send("No one was born today.");
        }
        var message = [];
        var title = "";
        var content = "";
        if (result != undefined) {
            for (var i = 0; i < result.length; i++) {
                if (result[i]["gender"] == 'Male') {
                    title = `Subject: Happy birthday!`
                    content = `Happy birthday, dear ${result[i]["first_name"]}!We offer special discount 20% off for the following items:White Wine, iPhone X`
                } else if (result[i]["gender"] == 'Female') {
                    title = `Subject: Happy birthday!`
                    content = `Happy birthday, dear ${result[i]["first_name"]}!We offer special discount 50% off for the following items:Cosmetic, LV Handbags`
                }
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