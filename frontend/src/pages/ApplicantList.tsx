import "./ApplicantList.css"
import { useState } from 'react'
import type { Dispatch, SetStateAction } from "react";

interface Applicant {
    id: number,
    name: string,
    email: string,
    phone: string,
}

interface Props {
    setSection: Dispatch<SetStateAction<"menu" | "members" | "applicants">>;
}

export default function ApplicantList({setSection}: Props) {
    const[applicants, setApplicants] = useState<Applicant[]>([
        {id: 1, name: "Charlie Brown", email: "charlie@yahoo.com", phone: "123-456-7890"},
        {id: 2, name: "Dana White", email: "dana@google.com", phone: "234-567-8901"},
    ]);

    const handleApprove = (id: number) => {
        const approved = applicants.find(a => a.id === id);
        if (approved) {
            alert(`Applicant ${approved.name} approved and added to members!`);
            setApplicants(applicants.filter(a => a.id !== id));
            //To DO: send to backend to actually add to members database
        }
    };

    const handleDecline = (id: number) => {
        const declined = applicants.find(a => a.id === id);
        if (declined) {
            alert(`Applicant ${declined.name} declined`);
            setApplicants(applicants.filter(a => a.id !==id));
        }
    };

    return (
        <div className="applicantlist-container">
            <h2 className="applicantlist-title">Applicants</h2>
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
                            <td>{applicant.phone}</td>
                            <td>
                                <button className="applicant-btn" onClick={() => handleApprove(applicant.id)}>Approve</button>
                                <button className="applicant-btn" onClick={() => handleDecline(applicant.id)}>Decline</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="back-btn" onClick={() => setSection("menu")}>Back</button>
        </div>
    );
}
