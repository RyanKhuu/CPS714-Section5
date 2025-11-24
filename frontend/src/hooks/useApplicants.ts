import { useEffect, useState, useCallback } from "react";
import type { Member } from "../types/databaseTypes";
import { fetchApplicants } from "../firebase/applicantApi";

interface UseApplicantsResult {
  applicants: Member[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useApplicants(): UseApplicantsResult {
  const [applicants, setApplicants] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); 

  const refetch = useCallback(() => {
    setLoading(true);
    setRefreshTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    async function getApplicants() {
      try {
        const data = await fetchApplicants();
        setApplicants(data);
        setError(null);
      } catch (err) {
        console.error("Error loading applicants:", err);
        setError(err instanceof Error ? err : new Error("Failed to load applicants."));
      } finally {
        setLoading(false);
      }
    }

    getApplicants();
  }, [refreshTrigger]); 

  return { applicants, loading, error, refetch };
}