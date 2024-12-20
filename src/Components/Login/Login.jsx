import React, { useState,useContext } from 'react';
import './Login.css';

import { useNavigate ,Link} from "react-router-dom";
import {Firebasecontext,AuthContext} from '../../store/Context';
import { signInWithEmailAndPassword } from 'firebase/auth';
function Login() {
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
     const {auth}= useContext(Firebasecontext);
   
     const navigate=useNavigate()
     const handlelogin = async (e) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/'); 
      } catch (error) {
        console.error("Error logging in:", error.message);
        alert("Login failed. Please check your credentials.")
      }
    };


  return (
    <div className="login-container">
    <div className="login-box">
      <h2>Login</h2>
<form onSubmit={handlelogin}>
        <div className="input-group">
          <label htmlFor="username">Email</label>
          <input 
            type="email" 
          value={email}
            onChange={(e)=>setEmail(e.target.value)}
           
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            value={password} onChange={(e)=>setPassword(e.target.value)}
          
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
        </form>
      <div className="signup-link">
        <span>New to Netflix? </span>
        <Link to="/signup" className="register-btn">Register now</Link> 
      </div>
    </div>
  </div>
  );
}

export default Login;
