const bcrypt = require("bcryptjs");
const users = require("./Users");
const session = require("express-session");
const express = require("express");
const router = express.Router();
const loginAuth = require("../midolowares/loginAuth");

router.get("/userregister", (req, res) => {
    res.render("register")
})

router.post("/userregister/save", (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let company = req.body.company;

    users.findOne({ where: { email:email } }).then(user => {
        if(user == undefined){
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
            users.create({
                name: name,
                email: email,
                password: hash,
                company: company
            }).then(() => {
                res.redirect("/")
            })
        }else{
            res.redirect("/userregister")
        }
    })
})

router.get("/useraccount", loginAuth, (req, res) => {
    res.render("account");
})

module.exports = router;