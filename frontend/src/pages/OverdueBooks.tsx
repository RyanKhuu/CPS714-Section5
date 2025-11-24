import React from "react";
import { useBooks } from "../hooks/useBooks";
import { OverdueList } from "../components/OverdueList"

const Header: React.FC = () => (
  <header
    style={{
      backgroundColor: "#6a0dad",
      color: "white",
      padding: "30px 0",
      textAlign: "center",
      fontSize: "40px",
      fontWeight: "bold",
      width: "100%",
    }}
  >
    LibraryLite
  </header>
);

interface Props {
  setPage: (page: "home" | "member" | "analytics" | "overdue") => void;
}

export default function OverdueBooksPage({ setPage }: Props) {
  const { books, loading, error } = useBooks();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7f7f7" }}>
      <Header />

      <div
        style={{
          padding: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100vw",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "20px", color: "black" }}>Overdue Books</h1>

        <OverdueList books={books} loading={loading} error={error} />
        
      </div>
      <button style={{marginBottom: "20px"}} className= "back-btn" onClick={() => setPage("home")}>Back to Dashboard</button>
    </div>
  );
}