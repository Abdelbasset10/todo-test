import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import logo from '../assets/logo.svg'
import { clearUser } from '../redux/features/authSlice'
import {toast} from 'react-toastify';
import { AddTodoModal } from '../redux/features/modalSlice';


const Navbar = () => {
  const dispatch = useDispatch()
  const {userData} = useSelector((state)=>state.auth)
  
  const handleClearUser = () => {
    dispatch(clearUser())
    toast.warning("You have been loged Out !")
  }

  return (
    <nav className='sticky top-0 z-20 w-full px-8 py-2 flex flex-col md:flex-row justify-between items-center bg-primaryDark text-white'>
      <div>
        <img src={logo} alt="logoPhoto" />
      </div>
      {userData && (
        <button className='border-2 border-white bg-white text-black px-4 py-2' onClick={()=>dispatch(AddTodoModal())}>
          Add New Todo
        </button>
      )}
      <div className='flex flex-col md:flex-row  items-center gap-4'>
        {userData && (
          <p className='my-2' >Welcome {userData[0]?.email}</p>
        )}
        <button className='border-2 border-white bg-white text-black px-4 py-2' onClick={handleClearUser} >LogOut</button>
      </div>
    </nav>
  )
}

export default Navbar