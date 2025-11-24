import { useState } from 'react';
import HomePage from "./pages/HomePage";
import MemberManagementPage from "./pages/MemberManagement";
import StatisticsPage from "./pages/StatisticsPage";
import './App.css';

function App() {
  const [page, setPage] = useState<"home" | "member" | "analytics" | "statistics" | "overdue">("home");
  
  return (
    <>
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "member" && <MemberManagementPage setPage={setPage} />}
      {page === "analytics" && <StatisticsPage />}
      {/* Add more pages as needed */}
    </>
  );
}

export default App;
// import StatisticsPage from "./features/statistics/StatisticsPage";
// import DailyCheckouts from "./features/statistics/DailyCheckouts";
// import PopularItems from "./features/statistics/PopularItems";
// function App() {
//   return <StatisticsPage/>;
// }

// export default App;
