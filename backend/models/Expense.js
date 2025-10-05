import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  note: { type: String },
  category: { type: String, default: "General" }
}, { timestamps: true });

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
