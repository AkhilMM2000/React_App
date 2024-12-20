import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Context, {Firebasecontext} from './store/Context.jsx';
import { auth, db } from './Firebase/Config.js'; 
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
          <Context>
    <Firebasecontext.Provider value={{ auth,db}}>

    <App/>
   
    </Firebasecontext.Provider>
    </Context>
  </StrictMode>,
)
