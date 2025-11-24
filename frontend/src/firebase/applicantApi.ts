import { db } from "../firebase";
import { doc, deleteDoc, collection, setDoc, getDocs, Timestamp } from "firebase/firestore";
import type { Member } from "../types/databaseTypes"; 

function mapDocToApplicant(doc: any): Member {
  return {
    id: doc.id,
    ...doc.data(),
  } as Member;
}

export async function fetchApplicants(): Promise<Member[]> { 
  const snapshot = await getDocs(collection(db, "Applicants"));
  return snapshot.docs.map(mapDocToApplicant);
}

export async function deleteApplicant(applicantId: string): Promise<void> {
  const applicantDocRef = doc(db, "Applicants", applicantId);
  await deleteDoc(applicantDocRef);
}

export async function approveApplicant(applicant: Member): Promise<void> {
  const memberRef = doc(db, "Members", applicant.id);
  const memberData = {
    ...applicant,
    dateCreated: Timestamp.now(), 
    lastOnline: Timestamp.now(),
  };
  await setDoc(memberRef, memberData);

  await deleteApplicant(applicant.id);
}