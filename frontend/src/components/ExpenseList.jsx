import { useEffect, useState } from "react";
import axios from "axios";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", amount: "", category: "" });

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/expenses");
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Delete an expense
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      fetchExpenses(); // Refresh list after delete
    } catch (err) {
      console.error(err);
    }
  };

  // Start editing
  const startEdit = (exp) => {
    setEditingId(exp._id);
    setEditData({
      title: exp.title,
      amount: exp.amount,
      category: exp.category,
    });
  };

  // Save edited expense
  const saveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/expenses/${id}`, editData);
      setEditingId(null);
      fetchExpenses(); // Refresh list after update
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-black p-6">
      <div className="w-full max-w-2xl">
        <h2 className="text-green-400 text-2xl font-bold mb-4 text-center">
          All Expenses
        </h2>
        <ul className="space-y-3">
          {expenses.map((exp) => (
            <li
              key={exp._id}
              className="flex justify-between items-center bg-gray-800 p-3 rounded border border-green-500 flex-nowrap"
            >
              {/* Expense info or editing inputs */}
              {editingId === exp._id ? (
                <div className="flex gap-2 items-center w-2/3 flex-nowrap">
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    className="bg-gray-700 text-white p-2 rounded w-1/3 flex-shrink-0"
                  />
                  <input
                    type="number"
                    value={editData.amount}
                    onChange={(e) =>
                      setEditData({ ...editData, amount: e.target.value })
                    }
                    className="bg-gray-700 text-white p-2 rounded w-1/4 flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={editData.category}
                    onChange={(e) =>
                      setEditData({ ...editData, category: e.target.value })
                    }
                    className="bg-gray-700 text-white p-2 rounded w-1/3 flex-shrink-0"
                  />
                </div>
              ) : (
                <span className="text-white w-2/3 truncate">
                  {exp.date?.substring(0, 10) || "N/A"} — ₹{exp.amount} [
                  {exp.category}]
                </span>
              )}

              {/* Buttons on right */}
              <div className="flex gap-2 flex-shrink-0">
                {editingId === exp._id ? (
                  <button
                    onClick={() => saveEdit(exp._id)}
                    className="ftbtn"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(exp)}
                    className="ftbtn"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteExpense(exp._id)}
                  className="ftbtn"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
