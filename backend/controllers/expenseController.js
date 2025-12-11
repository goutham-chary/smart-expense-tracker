const Expense = require("../models/Expense");
const mongoose = require("mongoose");

const mapExpense = (exp) => ({
  id: exp._id,
  user: exp.user,
  title: exp.title,
  amount: exp.amount,
  category: exp.category,
  date: exp.date,
  type: exp.type,
  createdAt: exp.createdAt,
  updatedAt: exp.updatedAt,
});

// GET /api/expenses 
const getExpenses = async (req, res) => {
  const userId = req.user._id;
  const expenses = await Expense.find({ user: userId }).sort({ date: -1 });
  res.json(expenses.map(mapExpense));
};

// GET /api/expenses/:id
const getExpenseById = async (req, res) => {
  const exp = await Expense.findById(req.params.id);
  if (!exp) return res.status(404).json({ message: "Expense not found" });
  if (exp.user.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Forbidden" });
  res.json(mapExpense(exp));
};

// POST /api/expenses
const createExpense = async (req, res) => {
  const { title, amount, category, date, type } = req.body;
  if (!title || amount == null || !date) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const expense = await Expense.create({
    user: req.user._id,
    title,
    amount,
    category,
    date: new Date(date),
    type: type || "expense",
  });
  res.status(201).json(mapExpense(expense));
};

// PUT /api/expenses/:id
const updateExpense = async (req, res) => {
  const exp = await Expense.findById(req.params.id);
  if (!exp) return res.status(404).json({ message: "Expense not found" });
  if (exp.user.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Forbidden" });

  const { title, amount, category, date, type } = req.body;
  exp.title = title ?? exp.title;
  exp.amount = amount ?? exp.amount;
  exp.category = category ?? exp.category;
  exp.date = date ? new Date(date) : exp.date;
  exp.type = type ?? exp.type;

  const updated = await exp.save();
  res.json(mapExpense(updated));
};

// DELETE /api/expenses/:id
const deleteExpense = async (req, res) => {
  try {
    const exp = await Expense.findById(req.params.id);

    if (!exp) {
      return res.status(404).json({ message: "Expense not found" });
    }
    if (exp.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await exp.deleteOne();

    return res.json({ message: "Expense removed" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


// DELETE /api/expenses  
const deleteAllExpenses = async (req, res) => {
  await Expense.deleteMany({ user: req.user._id });
  res.json({ message: "All expenses removed for user" });
};

// GET /api/expenses/search?keyword=...
const searchExpenses = async (req, res) => {
  const { keyword = "" } = req.query;
  const regex = new RegExp(keyword, "i");
  const expenses = await Expense.find({
    user: req.user._id,
    $or: [{ title: regex }, { category: regex }],
  }).sort({ date: -1 });
  res.json(expenses.map(mapExpense));
};

// GET /api/expenses/filter?category=...&month=YYYY-MM
const filterExpenses = async (req, res) => {
  const { category, month } = req.query;
  const query = { user: req.user._id };
  if (category) query.category = category;
  if (month) {
    // expect month like '2025-04' or '2025-04-01'
    const [y, m] = month.split("-");
    const start = new Date(y, Number(m) - 1, 1);
    const end = new Date(y, Number(m), 1);
    query.date = { $gte: start, $lt: end };
  }
  const expenses = await Expense.find(query).sort({ date: -1 });
  res.json(expenses.map(mapExpense));
};

// GET /api/expenses/sort?by=amount (or date)
const sortExpenses = async (req, res) => {
  const { by = "date" } = req.query;
  const sortQuery = {};
  if (by === "amount") sortQuery.amount = -1;
  if (by === "date") sortQuery.date = -1;
  const expenses = await Expense.find({ user: req.user._id }).sort(sortQuery);
  res.json(expenses.map(mapExpense));
};

// GET /api/expenses/summary  -> totals for income / expense / balance
const getSummary = async (req, res) => {
  const userId = req.user._id;
  const agg = await Expense.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userId) } },
    { $group: { _id: "$type", total: { $sum: "$amount" } } },
  ]);
  const summary = { income: 0, expense: 0, balance: 0 };
  agg.forEach((g) => {
    if (g._id === "income") summary.income = g.total;
    if (g._id === "expense") summary.expense = g.total;
  });
  summary.balance = summary.income - summary.expense;
  res.json(summary);
};

// GET /api/expenses/statistics  -> group by category totals
const getStatistics = async (req, res) => {
  const userId = req.user._id;
  const agg = await Expense.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userId) } },
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } },
  ]);
  res.json(agg.map((a) => ({ category: a._id, total: a.total })));
};

module.exports = {
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
};
