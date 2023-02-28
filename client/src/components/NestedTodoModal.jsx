import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {FaTimes} from 'react-icons/fa'
import { createNestedTodo, getNestedTodos, updateNestedTodo } from '../redux/api'
import {toast} from 'react-toastify'
import { closeModal } from '../redux/features/modalSlice'

const NestedTodoModal = () => {
    const dispatch = useDispatch()
    const {todoId} = useSelector((state)=>state.todo)
    const [nestedTodoInfo,setNestedTodoInfo] = useState({
        todoId:todoId,title:"",completed:false,endDate:"",description:""
    })
    const {nestedTodoId} = useSelector((state)=>state.modal)

    useEffect(()=>{
        if(nestedTodoId){
            const getTheNestedTodo = async () => {
                const {data} = await getNestedTodos(todoId)
                const nest = await data.find((d)=>d.id === nestedTodoId)
                if(nest){
                    setNestedTodoInfo(nest)
                }
            }
            getTheNestedTodo()
        }
    },[nestedTodoId])

    const handleChange = (e) => {
        if(e.target.name === "completed"){
            setNestedTodoInfo({...nestedTodoInfo,completed:e.target.checked})
        }else{
            setNestedTodoInfo({...nestedTodoInfo,[e.target.name]:e.target.value})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!nestedTodoInfo.title){
            return toast.error("You have to fill the Title !!")
        }
        if(nestedTodoId){
            await updateNestedTodo(nestedTodoId,nestedTodoInfo)
            toast.info("You have been update the Nested Todo !")
            dispatch(closeModal())
        }else{
            await createNestedTodo(nestedTodoInfo)
            toast.info("You have been added new Nested Todo !")
            dispatch(closeModal())
        }   
    }

    

  return (
    <div className='fixed top-0 w-full h-screen bg-[rgba(0,0,0,0.4)] z-20 flex items-center justify-center' > 
        <div className='relative w-11/12 sm:w-8/12 md:w-7/12 lg:w-6/12 bg-[white] p-4'>
            <FaTimes className='text-red-600 text-3xl absolute top-4 right-4 cursor-pointer' onClick={()=>dispatch(closeModal())} />
        <h1 className='text-center text-lg sm:text-3xl mb-10'>{nestedTodoId ? 'Update Nested Todo' : 'Add New Nested Todo'}</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
            <input type="text"
            className='h-10 border-2 border-[#374151] outline-none p-2'
            placeholder='nestedTodo title...'
            name="title"
            value={nestedTodoInfo.title}
            onChange={handleChange}
            />
            <input type="text"
            className='h-10 border-2 border-[#374151] outline-none p-2'
            placeholder='nestedTodo description...'
            name="description"
            value={nestedTodoInfo.description}
            onChange={handleChange}
            />
            <input type="date"
            className='h-10 border-2 border-[#374151] outline-none p-2'
            name="endDate"
            value={nestedTodoInfo.endDate}
            onChange={handleChange}
            />
            <div className='flex gap-2' >
                <label>Completed</label>
                <input type="checkbox"
                name="completed"
                checked={nestedTodoInfo.completed}
                value={nestedTodoInfo.completed}
                onChange={handleChange} />
            </div>
            <button className='h-10 text-[white] bg-[#374151]' >{nestedTodoId ? 'Update' : 'Add'}</button>
        </form>
        </div>
    </div>
)
}

export default NestedTodoModal