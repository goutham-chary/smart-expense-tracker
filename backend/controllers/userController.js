const Expense = require("../models/Expense");

// GET /api/users/:id/expenses
const getUserExpenses = async (req, res) => {
  const { id } = req.params;
  if (req.user._id.toString() !== id.toString() && req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  const expenses = await Expense.find({ user: id }).sort({ date: -1 });
  res.json(
    expenses.map((exp) => ({
      id: exp._id,
      title: exp.title,
      amount: exp.amount,
      category: exp.category,
      date: exp.date,
      type: exp.type,
    }))
  );
};

module.exports = { getUserExpenses };
