// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,signOut ,updateProfile} from "firebase/auth";
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import { getDatabase } from "firebase/database"


const firebaseConfig = {
  apiKey: "AIzaSyCKZq9In89FR8m16yh18TZ9kTvlr293Xho",
  authDomain: "hotellapp2.firebaseapp.com",
  projectId: "hotellapp2",
  storageBucket: "hotellapp2.appspot.com",
  messagingSenderId: "830565712327",
  appId: "1:830565712327:web:d9352405db6ac0245159e2",
  measurementId: "G-45E2CECNLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getDatabase();

export function logout(){
  return signOut(auth)
}
//storage
//storage
export async function upload(file,user,setLoading){
  const fileRef = ref(storage,user.uid );
  setLoading(true);
  
 const snapshot = await uploadBytes(fileRef,file);


 const photoURL = await getDownloadURL(fileRef);
 updateProfile(user, {photoURL});


 setLoading(false);
 alert("you have uploaded a picture")
}