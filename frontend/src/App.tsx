import { useState } from 'react';
import HomePage from "./pages/HomePage";
import MemberManagementPage from "./pages/MemberManagement";
import StatisticsPage from "./pages/StatisticsPage";
import OverdueBooksPage from './pages/OverdueBooks';
import './App.css';

function App() {
  const [page, setPage] = useState<"home" | "member" | "analytics" | "statistics" | "overdue">("home");
  
  return (
    <>
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "member" && <MemberManagementPage setPage={setPage} />}
      {page === "analytics" && <StatisticsPage setPage={setPage} />}
      {page === "overdue" && <OverdueBooksPage setPage={setPage} />}
    </>
  );
}

export default App;