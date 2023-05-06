// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 

import { firebaseConfig} from "../../config/config";

export default async function handler(req, res) {
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  const db = getFirestore(app);

  // Add a new document in collection "cities"
  await setDoc(doc(db, "cities", "LA"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  });

  res.status(200).json({ name: 'John Doe' })
}
