const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const loginAuth = require("./midolowares/loginAuth");
const connection = require("./database/database");
const gamesControler = require("./games/gamesControler");
const partnersControler = require("./partners/partnersControler");
const userControler = require("./user/userControler");

connection
    .authenticate()
    .then(() => {
        console.log("Server conectado ao banco de dados")
    })
    .catch(err => {
        console.log(err)
    })

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", gamesControler);
app.use("/", partnersControler);
app.use("/", userControler);

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.listen(8080, () => {
    console.log("Server on");
})