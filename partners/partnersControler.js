const express = require("express");
const router = express.Router();

router.get("/partners", (req, res) => {
    res.send("ainda sem parceiros :((");
})

module.exports = router;