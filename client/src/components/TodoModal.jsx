import React, {useState, useEffect} from 'react'
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import { closeModal } from '../redux/features/modalSlice';
import { createTodo, getUserTodos, updateTodo } from '../redux/features/todoSlice';


const TodoFrom = () => {
    const dispatch = useDispatch()
    const {userTodos} = useSelector((state)=>state.todo)
    const userId = useSelector((state)=>state.auth.userData[0].id)
    const [todoInfo,setTodoInfo] = useState({
    userId:userId,title:"",completed:false,endDate:"",pos:1,description:""
    })
    const {todoId} = useSelector((state)=>state.modal)
    
    useEffect(()=>{
        const getTheTodo = async () => {
            if(todoId){
                const getTodo = await userTodos.find((t)=>t.id === todoId)
                setTodoInfo(getTodo)     
            }
        }
        getTheTodo()
    },[todoId])
    
    const handleChange = (e) => {
        if(e.target.name === "completed"){
            setTodoInfo({...todoInfo,completed:e.target.checked})
        }else{
            setTodoInfo({...todoInfo,[e.target.name]:e.target.value})
        }
    }

    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!todoInfo.title){
            return toast.error("You have to fill the Title !!")
        }
        
        if(todoId){ // here test if we will update todo
            dispatch(updateTodo({todoId,todoInfo,toast}))
            dispatch(getUserTodos(userId))
            dispatch(closeModal())
        }else{
            dispatch(createTodo({todoInfo,toast}))
            dispatch(getUserTodos(userId))
            dispatch(closeModal())
        }
        
    }
  return (
    <div className='fixed top-0 w-full h-screen bg-modal z-20 flex items-center justify-center' >
        <div className='relative w-11/12 sm:w-8/12 md:w-7/12 lg:w-6/12 bg-white p-4'>
            <FaTimes className='text-red text-3xl absolute top-4 right-4 cursor-pointer' onClick={()=>dispatch(closeModal())} />
            <h1 className='text-center text-lg sm:text-3xl mb-10' >{todoId ? 'Update Todo' : 'Add New Todo'}</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
                <input type="text"
                className='h-10 border-2 border-secondaryDark outline-none p-2'
                placeholder='Todo title...'
                name="title"
                value={todoInfo?.title}
                onChange={handleChange} />
                <input type="text"
                className='h-10 border-2 border-secondaryDark outline-none p-2'
                placeholder='Todo description...'
                name="description"
                value={todoInfo?.description}
                onChange={handleChange} />
                <input type="date"
                className='h-10 border-2 border-secondaryDark outline-none p-2'
                placeholder='Todo title...'
                name="endDate"
                value={todoInfo?.endDate}
                onChange={handleChange} />
                <input type="number"
                className='h-10 border-2 border-secondaryDark outline-none p-2'
                placeholder='Todo title...'
                name="pos"
                value={todoInfo?.pos}
                onChange={handleChange} />
                <div className='flex gap-2' >
                <label>Completed</label>
                <input type="checkbox"
                name="completed"
                checked={todoInfo.completed}
                value={todoInfo.completed}
                onChange={handleChange} />
            </div>
                <button className='h-10 text-white bg-secondaryDark' >{todoId ? 'Update' : 'Add'}</button>
            </form>
    </div>
    </div>
)
}

export default TodoFrom