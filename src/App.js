import './App.css';
import AppointmentsList from './features/appointment/AppointmentsList'
import SignUp from './features/user/SignUp';
import Login from './features/user/Login';
import EditAppointment from './features/appointment/EditAppointment';
import AddAppointment from './features/appointment/AddAppointment';
import 'semantic-ui-css/semantic.min.css';
import { ToastContainer } from 'react-toastify';
import { Route ,Routes} from 'react-router-dom';
import NavBar from "./NavBar"
import ProtectedRouteForUser from "./ProtectedRouteForUser"
import { getUserFromSession } from './features/user/userApi';
import { useDispatch } from 'react-redux';
import { saveUser } from './features/user/userSlice';
import { useState } from 'react';


function App() {
 const dispatch=useDispatch();
  let [x,setX]=useState(null)

  getUserFromSession().then(res=>{
          setX(true)
     console.log(res)
      dispatch(saveUser(res.data))
     }
     )
  .catch(err=>setX(true))

  return (
   <>
    {x!=null&&
     <div>
     <NavBar/>
    <ToastContainer/>
    <Routes> 
    
      <Route path='appointments'
      
        element={
          <ProtectedRouteForUser>
        <AppointmentsList/>
        </ProtectedRouteForUser>
      } 
     />
    
      <Route path="login" 
       element={
       <Login/>
       } />

     <Route path="signUp"  
     element={
     <SignUp/>
     } />

     <Route path="/"  
     element={

      <ProtectedRouteForUser>
        <AppointmentsList/>
        </ProtectedRouteForUser>
     } />


      <Route path="addAppointment" 
       element={
        <ProtectedRouteForUser>
          <AddAppointment/> 
          </ProtectedRouteForUser>
           } />
     
    
     <Route path="editAppointment/:id" 
       element={
        <ProtectedRouteForUser>
          <EditAppointment/> 
          </ProtectedRouteForUser>
           } />
     
      
   
  
    </Routes>
     </div> }
     </>
  );
}

export default App;
