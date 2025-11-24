import React from 'react';
import type { Book } from '../types/databaseTypes';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const formatTimestamp = (timestamp: typeof book.borrowedAt) => {
    return timestamp ? timestamp.toDate().toLocaleString() : "N/A";
  };

  return (
    <div
      style={{
        background: "white",
        color: "black",
        border: "1px solid #ddd",
        padding: "0px",
        marginBottom: "20px",
        borderRadius: "10px",
        width: "100%",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "24px" }}>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Published:</strong> {book.publishDate}</p>
      <p><strong>Genre:</strong> {book.genre || "N/A"}</p>
      <p><strong>Borrowed By:</strong> {book.borrowedBy || "N/A"}</p>
      <p>
        <strong>Borrowed At:</strong> {formatTimestamp(book.borrowedAt)}
      </p>
      <p>
        <strong>Due Date:</strong> {formatTimestamp(book.dueDate)}
      </p>
    </div>
  );
};