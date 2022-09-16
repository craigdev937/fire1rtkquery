import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCDZlMsc9hNnk9-qK5jODEWr0peZMu2v_E",
  authDomain: "fire1rtkquery.firebaseapp.com",
  projectId: "fire1rtkquery",
  storageBucket: "fire1rtkquery.appspot.com",
  messagingSenderId: "876957528861",
  appId: "1:876957528861:web:bb6886a3b42b91542fe7f4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);



