
// import './App.css';
import LandingPage from './pages/LandingPage';
import Rooms from './pages/Rooms';
import Login from './Login';
import Signup from './register';
// import { useUserContext } from './UserContet';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
// import {useHistory} from 'react-router-dom';
 import Profile from './profile';
import { CurrencyBitcoin } from '@mui/icons-material';
import Bookings from './Booking';
import { child, get, ref } from "firebase/database";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { UserAuthContextProvider } from "./contexts/UserAuthContext";
import Navbar from "./navBar";
import { db } from "./firebase";
import { ReadFromFirebase } from "./Redux/actions";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import ProtectedRoute from "./Components/ProtectedRoute";
import SingleRooms from "./pages/SingleRooms";
import Booknow from "./pages/Booknow";
import Footer from "./Components/Footer";
function App() {
  // const {loading,error,user } = useUserContext();
  // const currentUser = false;
  // let history = useHistory();
  // const RequireAuth=({children})=>{
  //   return currentUser ? children:  history.push("/login");
  // }
  const dispatch = useDispatch();

  function readFromDatabase() {
    const dbRef = ref(db);
    get(child(dbRef, "/hotels"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          dispatch(ReadFromFirebase(data));
        } else {
          console.log("no data");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    async function start() {
      await readFromDatabase();
    }
    start();
   
  }, []);

  return (
    <div className="App">
         <Router>
    
      
     
   
     
         <UserAuthContextProvider>
    
    
    <Navbar />
    <Switch>
          <Route exact path = "/"><LandingPage/></Route>
          <Route exact path="/Rooms" > <Rooms/> </Route> 
            <Route path="/rooms/:slug" element={<SingleRooms />} />

            <Route path="/about" element={<About />} />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  {" "}
                  <Bookings />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/booknow/:slug"
              element={
                <ProtectedRoute>
                  <Booknow />
                </ProtectedRoute>
              }
            />
            <Route path="/contact-us" element={<Contact />} />
            <Route exact path="/Login" > <Login/> </Route>
            <Route exact path = '/signup' ><Signup/></Route>
            <Route exact path = '/profile' ><Profile/></Route>
            <Route path="*" element={<Error />} />
          
        
    
  
    </Switch>
    <br/>
    <Footer />
    </UserAuthContextProvider>
   </Router>
     {/* {currentUser && <Profile/>} */}
    </div>
  );
}

export default App;
