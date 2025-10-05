import { useState } from "react";
import axios from "axios";


export default function ExpenseForm() {
  const [form, setForm] = useState({
    amount: "",
    date: "",
    note: "",
    category: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/expenses", form);
    setForm({ amount: "", date: "", note: "", category: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="inbtn p-3 border-2 rounded text-black placeholder-gray-200 focus:outline-none"
        required
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="inbtn p-3 border-2 rounded text-black placeholder-gray-200 focus:outline-none"
        required
      />
      <input
        name="category"
        type="text"
        placeholder="Category (e.g. Food)"
        value={form.category}
        onChange={handleChange}
        className="inbtn p-3 border-2 rounded text-black placeholder-gray-200 focus:outline-none"
      />
     

      <button
        type="submit"
        className="bg-green-800 hover:bg-green-400 text-black font-bold py-2 px-4 rounded w-full"
      >
        Add Expense
      </button>
    </form>
  );
}
