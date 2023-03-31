/* eslint-disable new-cap */
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Fuck yeah");
},
);

module.exports = router;
