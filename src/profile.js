

// import { updateCurrentUser } from 'firebase/auth';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import img6 from './pp.png';
import { useUserAuth,upload} from "./contexts/UserAuthContext";
// import {upload} from './firebase'

function Profile() {
  
  const user=  useUserAuth();
  const [loading,setLoading] = useState(false);
  const [photo,setPhoto] = useState(null);
  const [photoURL,setPhotoURL] = useState(img6);

  function handleChange(e){
    if (e.target.files[0]){
      setPhoto(e.target.files[0])
    }
  }
  function handleClick(){
    upload(photo,user,setLoading);
  }
    useEffect(()=>{
      if(user?.photoURL ){
        setPhotoURL( user.photoURL);
      }
      
    },[user])
 
    
    return (
      <div>
          <input type="file" onChange={handleChange} />
          <button disabled={loading|| !photo} onClick={handleClick}>upload</button>
          <img src={photoURL} alt="avator" className='profile'/>
      </div>
    )
}

export default Profile;

