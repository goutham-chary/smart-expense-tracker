const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, default: "Other" },
    date: { type: Date, required: true },
    type: { type: String, enum: ["expense", "income"], default: "expense" },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Expense", expenseSchema);
