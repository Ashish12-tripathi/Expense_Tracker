import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

export default function HomePage() {
  return (
    <>
      <h1 className="text-green-400 text-2xl mb-4">Expense Tracker</h1>
      <ExpenseForm />
      <ExpenseList />
    </>
  );
}
