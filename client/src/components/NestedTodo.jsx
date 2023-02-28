import React from 'react'
import {useDispatch} from 'react-redux'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { deleteNestedTodo } from '../redux/api'
import {toast} from 'react-toastify'
import { updateNestedTodoModal } from '../redux/features/modalSlice'
import { updateTodoId } from '../redux/features/todoSlice'

const NestedTodo = ({todo,fotherId,nested,setNested}) => {
    const dispatch = useDispatch()

    const handleDelete = async () => {
        await deleteNestedTodo(todo.id)
        setNested(nested.filter((n)=>n.id!==todo.id))
        
        toast.warning("You have been deleted nested todo !!")
    }

    const openUpdaeNested = () => {
        dispatch(updateNestedTodoModal(todo.id))
        dispatch(updateTodoId(fotherId))
    }
    
    return (
        <div className={`p-4 border-1 rounded-3xl bg-secondaryDark ${todo.completed ? 'text-black' : 'text-white'} relative ${todo.completed && 'bg-green-400'}`}>
            <p className=' md:max-w-[31rem] lg:text-xl font-bold' >{todo?.title}</p>
                <div>
                    <p> <span className='font-bold' >Description :</span> {todo.description}</p>
                    <p>I have to end before : <span className='font-bold' >{todo.endDate}</span></p>
                    <p><span className='font-bold' >Completed :</span> {todo.completed ? 'Yes' : 'Not Yet'} </p>
                </div>  
            <div className='lg:absolute lg:right-4 mt-4 lg:mt-0 flex items-center gap-2 sm:gap-4 bottom-[30%]' >
                <MdDelete className='text-2xl text-red cursor-pointer' onClick={handleDelete} />
                <FaEdit className='text-2xl text-green-800 cursor-pointer' onClick={openUpdaeNested}   />  
            </div>
        </div>
    )
}

export default NestedTodo