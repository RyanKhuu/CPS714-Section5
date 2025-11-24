import "./MembersList.css"
import { useState } from 'react'
import type { Dispatch, SetStateAction } from "react";

interface Member {
    id: number;
    name: string;
    lastOnline: string;
    dateCreated: string;
}

interface Props {
    setSection: Dispatch<SetStateAction<"menu" | "members" | "applicants">>;
}

export default function MembersList({setSection }: Props) {
    //Dummy Data
    const[members, setMembers] = useState<Member[]>([
        {id: 1, name: "Alice Smith", lastOnline: "2025-11-18", dateCreated: "2025-01-10"},
        {id: 2, name: "Bob Johnson", lastOnline: "2025-11-17", dateCreated: "2025-02-05"},
    ]);


    const handleDelete = (id: number) => {
        setMembers(members.filter(member => member.id !== id));
        alert(`Member ${id} deleted`);
    }

    return (
        <div className="memberslist-container">
            <h2 className="memberslist-title">Existing Members</h2>
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
                            <td>{member.lastOnline}</td>
                            <td>{member.dateCreated}</td>
                            <td>
                                <button className= "members-btn" onClick={() => handleDelete(member.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="back-btn" onClick={() => setSection("menu")}>Back</button>
        </div>
    );
}