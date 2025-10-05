import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReportsPage from "./pages/ReportsPage";

function App() {
  return (
    <Router>
      <div className="container">
       <nav className="mb-4 text-lg">
      <Link to="/" className="navbtn " style={{ marginRight: "50px" ,color:"white" , border: "3px solid #4CAF50"}}>
        Home
      </Link>
      <Link to="/reports" className="navbtn"  style={{ marginRight: "50px" ,color:"white" , border: "3px solid #4CAF50" }} >
        Reports
      </Link>
    </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
