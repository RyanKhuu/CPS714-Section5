import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export async function deleteMember(memberId: string): Promise<void> {
  const memberDocRef = doc(db, "Members", memberId);
  await deleteDoc(memberDocRef);
}