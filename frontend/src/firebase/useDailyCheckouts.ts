import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import type { CheckedBooks } from "../types/databaseTypes";

interface ChartData {
  checkedOut: number[];
  xLabels: string[];
}

interface UseCheckoutsResult {
  data: ChartData;
  loading: boolean;
  error: Error | null;
}

export function useDailyCheckouts(): UseCheckoutsResult {
  const [data, setData] = useState<ChartData>({ checkedOut: [], xLabels: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCheckouts() {
      try {
        const snapshot = await getDocs(collection(db, "checkedItems")); 
        
        const rawData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as CheckedBooks[]; 

        rawData.sort((a, b) => (a.date?.toMillis() || 0) - (b.date?.toMillis() || 0));

        const checkedOutAmounts = rawData.map(item => item.count);
        const dateLabels = rawData.map(item => {
          return item.date ? item.date.toDate().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }) : 'N/A';
        });

        setData({ checkedOut: checkedOutAmounts, xLabels: dateLabels });
        setError(null);
      } catch (err) {
        console.error("Error loading daily checkouts:", err);
        setError(err instanceof Error ? err : new Error("Failed to load chart data."));
      } finally {
        setLoading(false);
      }
    }

    fetchCheckouts();
  }, []);

  return { data, loading, error };
}