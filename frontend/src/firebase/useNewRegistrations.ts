import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 
import type { Member } from "../types/databaseTypes"; 

interface RegistrationRow {
  userName: string;
  memberId: string;
  registrationDate: string;
}

interface UseRegistrationsResult {
  rows: RegistrationRow[];
  loading: boolean;
  error: Error | null;
}

export function useNewRegistrations(): UseRegistrationsResult {
  const [rows, setRows] = useState<RegistrationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchNewRegistrations() {
      try {
        const snapshot = await getDocs(collection(db, "Members")); 
        
        const rawMembers = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Member[]; 

        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const todayTimestamp = today.getTime();

        const newRegistrationsToday = rawMembers.filter(member => {
          if (!member.dateCreated) return false;
          const memberCreationDate = member.dateCreated.toDate();
          memberCreationDate.setHours(0, 0, 0, 0); 
          return memberCreationDate.getTime() === todayTimestamp;
        });

        const formattedRows: RegistrationRow[] = newRegistrationsToday.map(member => ({
          userName: member.name,
          memberId: member.id, // Use member ID as the secondary identifier
          registrationDate: member.dateCreated 
            ? member.dateCreated.toDate().toLocaleTimeString() // Show time of registration
            : 'N/A',
        }));

        setRows(formattedRows);
        setError(null);
      } catch (err) {
        console.error("Error loading new registrations:", err);
        setError(err instanceof Error ? err : new Error("Failed to load registration data."));
      } finally {
        setLoading(false);
      }
    }

    fetchNewRegistrations();
  }, []); 

  return { rows, loading, error };
}