import "./MembersList.css";
import type { Dispatch, SetStateAction } from "react";
import { deleteMember } from "../firebase/membersApi";
import { useMembers } from "../firebase/useMembers"; 

interface Props {
  setSection: Dispatch<SetStateAction<"menu" | "members" | "applicants">>;
}

export default function MembersList({ setSection }: Props) {
  const { members, loading, error, refetch } = useMembers(); 
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this member?")) {
        return;
    }
    
    try {
      await deleteMember(id); 
      refetch(); 
      console.log(`Member ${id} successfully deleted from Firestore.`);
      
    } catch (err) {
      console.error("Error deleting member:", err);
      alert("Failed to delete member. Check console for details.");
    }
  }

  const formatDate = (timestamp: typeof members[number]["dateCreated"]) => {
    return timestamp ? timestamp.toDate().toLocaleDateString() : "N/A";
  };

  if (loading) {
    return (
        <div className="memberslist-container">
            <h2 className="memberslist-title">Existing Members</h2>
            <p>Loading members...</p>
            <button className="back-btn" onClick={() => setSection("menu")}>Back</button>
        </div>
    );
  }

  if (error) {
    return (
        <div className="memberslist-container">
            <h2 className="memberslist-title">Existing Members</h2>
            <p style={{ color: "red" }}>Error loading data: {error.message}</p>
            <button className="back-btn" onClick={() => setSection("menu")}>Back</button>
        </div>
    );
  }

  return (
    <div className="memberslist-container">
      <h2 className="memberslist-title">Existing Members</h2>
      {members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Last Online</th>
              <th>Date Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{formatDate(member.lastOnline)}</td>
                <td>{formatDate(member.dateCreated)}</td>
                <td>
                  <button 
                    className="members-btn" 
                    onClick={() => handleDelete(member.id)}
                  >
                    Delete
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