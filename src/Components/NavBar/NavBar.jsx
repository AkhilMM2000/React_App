import React, { useContext ,useEffect} from 'react'
import "./NavBar.css";

import {Link, useNavigate} from 'react-router-dom'
import { AuthContext, Firebasecontext } from '../../store/Context';
import { signOut ,onAuthStateChanged} from 'firebase/auth';
function NavBar() {

    const {user,setUser }=useContext(AuthContext)

    const {auth}= useContext(Firebasecontext);
    const navigate=useNavigate()
    useEffect(() => {
      // Listen for authentication state changes
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log('Current User:', currentUser);
        setUser(currentUser);
              if(currentUser) {
                navigate('/' ,{ replace: true })
              }                          
      });
    
      // Cleanup the listener when the component unmounts
      return () => unsubscribe();
    }, [auth, setUser,navigate]);
    const handlelogout=()=>{
      signOut(auth)
      .then(() => {
        setUser(null)
        alert('Successfully logged out!');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout failed:', error.message);
        alert('Error during logout: ' + error.message);
      });
    }
 
    return (
        <div className="navbar">
        <img className="logo" 
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" 
             alt="Netflix Logo" />
        
        <div className="navbar-right">
      
        {!user && (
  <Link to="/login" style={{ textDecoration: 'none' }}>
    <div className="loginPage">
      <span>Login</span>
      <hr />
    </div>
  </Link>
)}
{user && (
  <div className="loginPage" >
    <span className='username'>{user.displayName}</span>
  
    <span
    style={{
      fontSize: '14px',
      color: '#f00',
      cursor: 'pointer',
      marginLeft: '10px',
      textDecoration: 'underline'
    }}
     onClick={handlelogout}
  >
    Logout
  </span>
  </div>
)}
            <img className="avatar" 
                 src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" 
                 alt="Avatar" />
        </div>
    </div>
    )
}

export default NavBar
