const bcrypt = require("bcryptjs");
const user = require("./Users");
const session = require("express-session");
const express = require("express");
const router = express.Router();
const loginAuth = require("../midolowares/loginAuth");

router.get("/useraccount", loginAuth, (req, res) => {
    res.render("account");
})

module.exports = router;