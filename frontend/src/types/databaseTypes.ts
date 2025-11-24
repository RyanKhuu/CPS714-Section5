import { Timestamp } from "firebase/firestore";

export interface Book {
  id: string;
  title: string;
  author: string;
  publishDate: number;
  genre: string;
  borrowedBy?: string | null;
  borrowedAt?: Timestamp | null;
  dueDate?: Timestamp | null;
  weeklyCount: number;
}

export interface Member {
  id: string;
  name: string;
  phoneNumber: string;
  email: number;
  lastOnline?: Timestamp | null;
  dateCreated?: Timestamp | null;
}

export interface CheckedBooks {
  id: string;
  count: number;
  date?: Timestamp | null;
}