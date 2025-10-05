import { useEffect, useState } from "react";
import axios from "axios";

export default function ExpenseSummary() {
  const [summary, setSummary] = useState({ total: 0, byCategory: {} });

  useEffect(() => {
    axios.get("http://localhost:5000/api/expenses").then(res => {
      const expenses = res.data;
      let total = 0;
      let byCategory = {};

      expenses.forEach(e => {
        total += e.amount;
        byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
      });

      setSummary({ total, byCategory });
    });
  }, []);

  return (
    <div>
      <h2 className="text-green-400 mb-2">Summary</h2>
      <p>Total Spent: ₹{summary.total}</p>
      <h3 className="mt-2">By Category</h3>
      <ul>
        {Object.entries(summary.byCategory).map(([cat, amt]) => (
          <li key={cat}>{cat}: ₹{amt}</li>
        ))}
      </ul>
    </div>
  );
}
