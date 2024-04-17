import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";
// thêm 1 room vào firebase
export const useFireStore = (col, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = collection(db, col).withConverter(null);

    if (condition) {
      if (
        !condition.fieldName ||
        !condition.operator ||
        !condition.compareValue
      ) {
        // Handle the error or return to prevent executing the rest of the code
        console.error("Invalid condition");
        return;
      }
      collectionRef = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue)
      );
    }

    collectionRef = query(collectionRef, orderBy("createdAt"), limit(50));

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(data);
    });

    // Clean up on component unmount
    return () => unsubscribe();
  }, [col, condition, db]); // Include all dependencies used within useEffect

  return documents;
};
