const express = require("express");
const router = express.Router();
const {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  deleteAllExpenses,
  searchExpenses,
  filterExpenses,
  sortExpenses,
  getSummary,
  getStatistics,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getExpenses);
router.get("/search", searchExpenses);
router.get("/filter", filterExpenses);
router.get("/sort", sortExpenses);
router.get("/summary", getSummary);
router.get("/statistics", getStatistics);
router.get("/:id", getExpenseById);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);
router.delete("/", deleteAllExpenses);

module.exports = router;
