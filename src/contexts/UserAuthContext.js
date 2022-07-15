import { createContext, useContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
 ,updateProfile
} from "firebase/auth";
import {getDownloadURL, uploadBytes} from 'firebase/storage';
import { auth, db ,storage} from "../firebase";

import { child, get, ref, set } from "firebase/database";
import { uid } from "uid";
 
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const uuid = uid();

  function logIn(email, password) {
    get(child(ref(db), "/users")).then((data) => {
      const userAuth = Object.values(data.val()).filter(
        (item) => item.email === email && item.isAdmin === false
      );
      if (userAuth[0]) {
        return signInWithEmailAndPassword(auth, email, password);
      }
      alert("Please Sign in with User Account.");
      // return signInWithEmailAndPassword(auth, email, password);
    });
  }

  function signUp(email, password, name, number, id) {
    return createUserWithEmailAndPassword(auth, email, password).then(() => {
      set(ref(db, `users/${uuid}`), {
        email,
        name,
        number,
        id,
        isAdmin: false,
      });
    });
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}
export function logOut() {
  return signOut(auth);
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
export async function upload(file,user,setLoading){
  const fileRef = ref(storage,user.uid );
  setLoading(true);
  
 const snapshot = await uploadBytes(fileRef,file);


 const photoURL = await getDownloadURL(fileRef);
 updateProfile(user, {photoURL});


 setLoading(false);
 alert("you have uploaded a picture")
}