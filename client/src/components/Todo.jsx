import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {FaArrowCircleDown, FaArrowAltCircleUp, FaEdit} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'
import { deleteTodo, getUserTodos, updateTodoId } from '../redux/features/todoSlice'
import {toast} from 'react-toastify'
import { getNestedTodos } from '../redux/api'
import NestedTodo from './NestedTodo'
import { AddNestesTodoModal, updateTodoModal } from '../redux/features/modalSlice'

const Todo = ({todo}) => {
  const dispatch = useDispatch()
  const userId = useSelector((state)=>state.auth.userData[0].id)
  const [nested,setNested] = useState([])
  const [showMore,setShowMore] = useState(false)
  const todoId = todo?.id

  const openNestedTodoModal = () => {
    dispatch(AddNestesTodoModal())
    dispatch(updateTodoId(todo.id))
  }

  const handleDelete = () => {
    dispatch(deleteTodo({todoId,toast}))
    dispatch(getUserTodos(userId))
  }
  const nestedTosos = async () => {
    const {data} = await getNestedTodos(todo.id)
    setNested(data)
  }
  const showTodoIndo = () => {
    setShowMore(!showMore)
    nestedTosos()
  }

  const openUpdateTodo = (id) => {
    dispatch(updateTodoModal(id))
  }

  return (
    <div className={`p-4 border-1 rounded-3xl bg-[white] relative ${todo?.completed && 'bg-green-300'}`}>
        <p className=' md:max-w-[31rem] lg:text-xl font-bold' >{todo?.title}</p>
        {showMore && (
          <div>
            <p><span className='font-bold' >Description:</span> {todo.description}</p>
            <p>I have to end before : <span className='font-bold' >{todo.endDate}</span></p>
            <p><span className='font-bold' >Completed :</span> {todo.completed ? 'Yes' : 'Not Yet'}</p>
            <div className='flex flex-col gap-4' >
              {nested.length === 0 && (
                <p>There is No nested Todos for the moment...</p>
              )}
            {nested?.map((n,index)=>{
                return (
                  <NestedTodo key={index} todo={n} fotherId={todoId} nested={nested} setNested={setNested} />
                )
            })}
            </div>
            <p className='mt-4 cursor-pointer text-[black] hover:text-[#374151]' onClick={openNestedTodoModal} >Add New Nested Todo</p>
          </div>
        )}
        
        <div className='lg:absolute lg:right-4 mt-4 lg:mt-0 flex items-center gap-2 sm:gap-4 top-4' >
          <MdDelete className='text-2xl text-red-600 cursor-pointer' onClick={handleDelete} />
          <FaEdit className='text-2xl text-green-800 cursor-pointer' onClick={()=>openUpdateTodo(todo.id)} />
          {showMore ? (
            <FaArrowAltCircleUp className='text-2xl text-blue-600 cursor-pointer' onClick={()=>setShowMore(!showMore)} />
          ) : (
            <FaArrowCircleDown className='text-2xl text-blue cursor-pointer' onClick={showTodoIndo} />
          )}
        </div>

    </div>
  )
}

export default Todo