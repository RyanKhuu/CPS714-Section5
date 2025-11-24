import React from 'react';
import type { Book } from '../types/databaseTypes';
import { BookCard } from './BookCard';

interface OverdueListProps {
  books: Book[];
  loading: boolean;
  error: Error | null;
}

export const OverdueList: React.FC<OverdueListProps> = ({ books, loading, error }) => {
  const now = new Date();
  const overdueBooks = books.filter(book => {
    if (!book.dueDate) return false;
    const due = book.dueDate.toDate(); 
    return due < now;
  });

  if (loading) {
    return <p style={{ fontSize: "20px" }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ fontSize: "20px", color: "red" }}>Error: {error.message}</p>;
  }

  if (overdueBooks.length === 0) {
    return <p style={{ fontSize: "20px" }}>No overdue books 🎉</p>;
  }

  return (
    <div>
      {overdueBooks.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};