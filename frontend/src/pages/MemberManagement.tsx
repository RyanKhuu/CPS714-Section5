import { useState } from "react";
import "./MemberManagement.css"
import MembersList from "./MembersList"
import ApplicantList from "./ApplicantList"

interface Props {
  setPage: (page: "home" | "member" | "analytics" | "overdue") => void;
}

export default function MemberManagementPage({ setPage }: Props) {
  const [section, setSection] = useState<"menu" | "members" | "applicants">("menu");
  
  if (section === "members") {
    return <MembersList setSection={setSection} />;
  }

  if (section === "applicants") {
    return <ApplicantList setSection={setSection} />;
  }

  return (
    <div className="member-management-container">
      <h1 className="member-management-title">Member Management</h1>

      <div className="sub-nav">
        <button className="member-btn" onClick={() => setSection("members")}>Existing Members</button>
        <button className="member-btn" onClick={() => setSection("applicants")}>Applicants</button>
      </div>

      <button className= "back-btn" onClick={() => setPage("home")}>Back to Dashboard</button>
    </div>
  );
}