import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 
import type { Member } from "../types/databaseTypes";

interface UseMembersResult {
  members: Member[];
  loading: boolean;
  error: Error | null;
  refetch: () => void; 
}

export function useMembers(): UseMembersResult {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); 

  const refetch = useCallback(() => {
    setLoading(true);
    setRefreshTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const snapshot = await getDocs(collection(db, "Members")); 
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Member[]; 

        setMembers(data);
        setError(null);
      } catch (err) {
        console.error("Error loading members:", err);
        setError(err instanceof Error ? err : new Error("Failed to load members."));
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, [refreshTrigger]); 

  return { members, loading, error, refetch };
}