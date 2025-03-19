const express = require("express");
const router = express.Router();

// Test Route - Get all users (temporary placeholder)
router.get("/", (req, res) => {
  res.json({ message: "Users route working!" });
});

module.exports = router;
