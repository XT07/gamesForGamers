const bcrypt = require("bcryptjs");
const Users = require("./Users");
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

    Users.findOne({ where: { email:email } }).then(user => {
        if(user == undefined){
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
            Users.create({
                name: name,
                email: email,
                password: hash,
                company: company
            }).then(() => {
                res.redirect("/login")
            })
        }else{
            res.redirect("/userregister")
        }
    })
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login/auth", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    Users.findOne({ where: { email:email } }).then(user => {
        if(user){
            let hash = bcrypt.compareSync(password, user.password);

            if(hash){
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password
                }
                res.redirect("/useraccount");
            }else{
                res.redirect("/login");
            }

        }else {
            res.redirect("/login");
        }
    })
})

router.get("/logout", loginAuth, (req, res) => {
    req.session.user = undefined;

    res.redirect("/login");
})

router.get("/useraccount", loginAuth, (req, res) => {
    res.render("account");
})

module.exports = router;