import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import Auth from './pages/Auth'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { setUser } from './redux/features/authSlice';

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.auth.userData)

  useEffect(()=>{
    dispatch(setUser())
  },[])
  
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/auth' element={!user ? <Auth /> : <Navigate to="/" />}  />
      <Route exact path='/' element={user ? <Home /> : <Navigate to="/auth" />} />
      <Route />
    </Routes>
    <ToastContainer />
    </BrowserRouter>
  )
}

export default App