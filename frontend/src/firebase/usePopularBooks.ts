import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import type { Book } from "../types/databaseTypes";

interface ChartData {
  bookNames: string[];
  weeklyCounts: number[];
}

interface UsePopularBooksResult {
  data: ChartData;
  loading: boolean;
  error: Error | null;
}

export function usePopularBooks(): UsePopularBooksResult {
  const [data, setData] = useState<ChartData>({ bookNames: [], weeklyCounts: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPopularBooks() {
      try {
        const snapshot = await getDocs(collection(db, "Books")); 
        
        const rawBooks = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Book[]; 

        const popularBooks = rawBooks.filter(book => book.weeklyCount && book.weeklyCount > 0);
        popularBooks.sort((a, b) => (b.weeklyCount || 0) - (a.weeklyCount || 0));

        const topBooks = popularBooks.slice(0, 10); 
        
        const bookNames = topBooks.map(book => book.title);
        const weeklyCounts = topBooks.map(book => book.weeklyCount || 0);

        setData({ bookNames, weeklyCounts });
        setError(null);
      } catch (err) {
        console.error("Error loading popular books:", err);
        setError(err instanceof Error ? err : new Error("Failed to load popular books chart data."));
      } finally {
        setLoading(false);
      }
    }

    fetchPopularBooks();
  }, []); 

  return { data, loading, error };
}