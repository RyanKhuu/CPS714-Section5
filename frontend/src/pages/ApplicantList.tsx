import "./ApplicantList.css";
import type { Dispatch, SetStateAction } from "react";
import { useApplicants } from "../hooks/useApplicants"; 
import type { Member } from "../types/databaseTypes"; 
import { deleteApplicant, approveApplicant } from "../firebase/applicantApi";

interface Props {
  setSection: Dispatch<SetStateAction<"menu" | "members" | "applicants">>;
}

export default function ApplicantList({ setSection }: Props) {
  const { applicants, loading, error, refetch } = useApplicants();


  const handleApprove = async (applicant: Member) => {
    if (!window.confirm(`Are you sure you want to approve and add ${applicant.name} to members?`)) {
      return;
    }

    try {
      await approveApplicant(applicant); 
      
      refetch(); 
      alert(`${applicant.name} approved and moved to Members!`);

    } catch (err) {
      console.error("Error approving applicant:", err);
      alert("Failed to approve applicant. Check console for details.");
    }
  };

  const handleDecline = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently decline this applicant?")) {
      return;
    }

    try {
      await deleteApplicant(id);
      
      refetch();
      alert(`Applicant declined and removed.`);

    } catch (err) {
      console.error("Error declining applicant:", err);
      alert("Failed to decline applicant. Check console for details.");
    }
  };

  if (loading) {
    return (
        <div className="applicantlist-container">
            <h2 className="applicantlist-title">Applicants</h2>
            <p>Loading applicants...</p>
            <button className="back-btn" onClick={() => setSection("menu")}>Back</button>
        </div>
    );
  }

  if (error) {
    return (
        <div className="applicantlist-container">
            <h2 className="applicantlist-title">Applicants</h2>
            <p style={{ color: "red" }}>Error loading data: {error.message}</p>
            <button className="back-btn" onClick={() => setSection("menu")}>Back</button>
        </div>
    );
  }

  return (
    <div className="applicantlist-container">
      <h2 className="applicantlist-title">Applicants</h2>
      {applicants.length === 0 ? (
        <p>No new applicants at this time. 🎉</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map(applicant => (
              <tr key={applicant.id}>
                <td>{applicant.id}</td>
                <td>{applicant.name}</td>
                <td>{applicant.email}</td>
                <td>{applicant.phoneNumber}</td>
                <td>
                  <button 
                    className="applicant-btn approve-btn"
                    onClick={() => handleApprove(applicant)}
                  >
                    Approve
                  </button>
                  <button 
                    className="applicant-btn decline-btn"
                    onClick={() => handleDecline(applicant.id)}
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="back-btn" onClick={() => setSection("menu")}>Back</button>
    </div>
  );
}