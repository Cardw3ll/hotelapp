import React, { useRef } from 'react'
import { useUserAuth } from "./contexts/UserAuthContext";
import {useHistory} from 'react-router-dom'

function Register() {
  const emailRef = useRef();
 
  const psdRef = useRef();
  let history = useHistory()

  const {signUp} = useUserAuth();

  const onSumbit=(e)=>{
    e.preventDefault();
    const email = emailRef.current.value;
   
    const password = psdRef.current.value;
    if(email && password) {
      signUp(email,password);
      history.push("/");
    }
  }
  return (
    <center>
        <label >Email:</label>
        <input type="email" ref={emailRef}/>
        {/* <label >Last Name:</label>
        <input type="text" ref={nameRef} /> */}
        <label >Password:</label>
        <input type="password" ref={psdRef}/>
      <button onClick={onSumbit}>submit</button>
       
    </center>
  )
}

export default Register