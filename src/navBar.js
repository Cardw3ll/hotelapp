import React from 'react';
import Profile from './profile';
import { useUserAuth } from "./contexts/UserAuthContext";
  import { NavLink } from "react-router-dom";
  import { Link } from 'react-router-dom';
import img6 from './pp.png';
 import {logOut} from './contexts/UserAuthContext'
import { useState} from 'react';

function NavBar() {
  const {user } = useUserAuth();
  const [photoURL,setPhotoURL] = useState(img6);
  const [loading,setLoading] = useState(false);


     //to logout the useer from website
     async function handleLogout(){
      setLoading(true);
    try { 
      logOut()
  } catch{
      alert("Couldn't logout");
  }
  setLoading(false);
  }
  return (
    <header class="header" id="navigation-menu">
      
      <div class="container">
    <nav>
      
    <a href="#" class="logo"> Cardwell suite </a>
   
    <ul class="nav-menu">
    <li className="nav-item">
                  <NavLink
                    className="nav-link"
                  //   activeClassName="active_class"
                    exact={true}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
      <li className="nav-item">
                  <NavLink
                    className="nav-link"
                  //   activeClassName="active_class"
                  exact={true}
                    to="/Rooms"
                  >
                    Rooms
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                  //   activeClassName="active_class"
                  exact={true}
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>
      <li> <NavLink
                        className="nav-link"
                      //   activeClassName="active_class"
                      exact={true}
                        to="/bookings"
                      >
                        Bookings
                      </NavLink>
                    </li>
      
{   !user  && <>
      <li> <button>  <Link to="Login">  login </Link>  </button> </li>
      <li> <button> <Link to="signup"> Signup  </Link> </button> </li>
</>  }
     {user  && <>
     <li><Link to="profile"> 
     <img src={photoURL} alt="avator" className='profile'/>
     </Link> 
     
     </li>
       <button disabled={loading || !user } onClick={handleLogout}>Logout</button>
     </> }
    </ul>

  
  </nav>
   </div>
   </header>
  )
}

export default NavBar
