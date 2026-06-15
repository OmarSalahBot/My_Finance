import React , { useEffect } from 'react';
import Dashboard from './pages/dashboard';
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthStore } from '../store/useAuthStore';




export default function App() {

  const { user , authCheck , isCheckingAuth } = useAuthStore(); 


    useEffect(()=>{
    authCheck();
  },[authCheck]);

  // if(isCheckingAuth) return <Loading show={true} /> ;

  return (
    <Router>
      <Routes>
        <Route path="*" element={user ? <Dashboard/> : <Navigate to={'/login'} />} />
        <Route path='/' element={user ? <Dashboard/> : <Navigate to={'/login'} />} />
        <Route path='/login' element={!user ? <Login/> : <Navigate to={'/'} />} />
        <Route path='/signup' element={!user ? <Signup/> : <Navigate to={'/'} />} />
      </Routes>

    </Router>
  )
}
