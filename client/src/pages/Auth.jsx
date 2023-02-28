import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { login, register } from '../redux/features/authSlice';

const Auth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isSignUp,setIsSignUp] = useState(false)
  const [userEmail,setUserEmail] = useState("")
  
  const handleChange = (e) => {
    setUserEmail(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(isSignUp){
      if(!userEmail){
        return toast.error("You have to enter your address email !!")
      }
      dispatch(register({userEmail,toast,navigate}))
    }else{
      if(!userEmail){
        return toast.error("You have to enter your address email !!")
      }
      dispatch(login({userEmail,toast,navigate}))
    }
  }
  return (
    <div className='bg-[#374151] h-[90.8vh] flex items-center justify-center'>
      <div className='border-2 border-[white] p-4 w-9/12 sm:w-7/12 md:w-6/12 lg:w-5/12' >
        <h1 className='text-3xl text-[white] mb-8' >{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
          <input type="email"
          className='h-10 border-2 border-[white] outline-none p-2'
          placeholder='Your Email...'
          name='userEmail'
          value={userEmail}
          onChange={handleChange} />
          <button className='bg-[white] text-[#374151] h-10 hover:bg-[#1F2937] hover:text-[white]' >{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>
        <div className='flex flex-col sm:flex-row items-center gap-2 mt-4'>
          <p className='text-[white]' >{isSignUp ? "Already have Account ? " : "Don't Have Account ?"}</p>
          <p className='cursor-pointer text-[black] hover:text-blue-600' onClick={()=>setIsSignUp(!isSignUp)} >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Auth