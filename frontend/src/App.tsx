import { useState } from 'react'
import HomePage from "./pages/HomePage"
import MemberManagementPage from "./pages/MemberManagement"


import './App.css'

function App() {
  const [page, setPage] = useState<"home" | "member" | "analytics" | "overdue">("home");
  
  return (
    <>
    {page === "home" && <HomePage setPage={setPage}></HomePage>}
    {page === "member" && <MemberManagementPage setPage={setPage}></MemberManagementPage>}
    </>
  );
}

export default App;
  
 