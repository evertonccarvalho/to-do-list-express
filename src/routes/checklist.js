const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("olá passou no checklist");
  res.send();
});

module.exports = router;
