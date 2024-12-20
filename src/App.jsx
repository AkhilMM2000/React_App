import React ,{useEffect,useContext}from 'react';
import './App.css';
import NavBar from '../../netflix_clone/src/Components/NavBar/NavBar';
import Banner from '../../netflix_clone/src/Components/Banner/Banner';
import RowPost from '../../netflix_clone/src/Components/RowPost/RowPost';
import { originals, action, horror, Comedy, Documentary } from './Urls';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import { Firebasecontext } from './store/Context';
 
function App() {
  

  return (
    <div className="App">
      <Router>
        {/* NavBar and Banner are shared and always visible */}
        <NavBar />
        

        {/* Use Routes and Route correctly */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                 <Banner  />
                <RowPost url={originals} title="Netflix Originals" />
                <RowPost url={horror} title="Horror" isSmall />
                <RowPost url={action} title="Action" isSmall />
                <RowPost url={Comedy} title="Comedy" isSmall />
                <RowPost url={Documentary} title="Documentaries" isSmall />
              </>
            }
          />
         <Route path='/signup' element={<SignUp/>}/>
         <Route path='/login' element={<Login/>}/>
        </Routes>
      
      </Router>
    </div>
  );
}

export default App;
