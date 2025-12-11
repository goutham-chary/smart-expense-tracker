const express = require("express");
const router = express.Router();
const { getUserExpenses } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);
router.get("/:id/expenses", getUserExpenses);

module.exports = router;
