import React, { useState,useContext } from 'react';
import './SignUp.css';
import { Firebasecontext } from '../../store/Context';
import { useNavigate ,Link} from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const {auth,db}=useContext(Firebasecontext)
const    navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert("Validation failed. Please fill all the fields.");
      return; 
    }

    const usernamePattern = /^[A-Za-z]+$/;
    if (!usernamePattern.test(username)) {
      alert("Validation failed. Username must contain only letters.");
      return;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Validation failed. Please enter a valid email address.");
      return;
    }

  
    
    if (password.length < 8) {
      alert("Validation failed. Password must be at least 8 characters long.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
    
        console.log(userCredential.user);
        
      
        return updateProfile(user, { displayName: username }).then(() => user);
      })
      .then((user) => {
        // Add user into firestore
        return addDoc(collection(db, "Netflixusers"), {
          id: user.uid,
          username,
          email,
       
        });
      })
      .then(() => {
        console.log("User created and details added to Firestore successfully!");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during signup:", error.message);
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
             <span>Already account? </span>
                  <Link to="/login" className="register-btn">Login</Link> 
        </form>
      </div>
    </div>
  );
}

export default SignUp;
