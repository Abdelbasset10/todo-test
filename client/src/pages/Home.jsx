import React , {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NestedTodoModal from '../components/NestedTodoModal'
import Todo from '../components/Todo'
import {getUserTodos } from '../redux/features/todoSlice'
import TodoModal from '../components/TodoModal'

const Home = () => {
  const dispatch = useDispatch()
  const userId = useSelector((state)=>state.auth.userData[0].id)
  const {userTodos} = useSelector((state)=>state.todo)
  const {nestedTodoModal} = useSelector((state)=>state.modal)
  const {todoModal} = useSelector((state)=>state.modal)

  useEffect(()=>{
    dispatch(getUserTodos(userId))
  },[dispatch,userId])

  if(todoModal) {
    return <TodoModal />
  }

    if(nestedTodoModal) {
        return <NestedTodoModal />
    }

    if(userTodos.length === 0) {
      return (
        <div className='w-full bg-secondaryDark min-h-[90.8vh]'>
          <div className='w-11/12 mx-auto py-10'>
            <p className='text-white text-3xl' >You don't have todos for Now..</p>
          </div>
        </div>
      )
    }
  
  return (
    <div className='w-full bg-secondaryDark min-h-[90.8vh]' >
      <div className='w-11/12 mx-auto py-10'>
        <h1 className='text-lg sm:text-3xl text-white mb-4' >The Todos are ordered by <span className='font-bold'>pos</span> value</h1>
        <div className='flex flex-col gap-4 w-full' >
          {userTodos.map((todo,index)=>{  
            return (
              <Todo key={index} todo={todo} />
            )
          })}
        </div> 
      </div>
    </div>
  )
}

export default Home