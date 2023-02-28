// import React, {useState, useEffect} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {toast} from 'react-toastify'
// import { createTodo, removeTodoId, updateTodo } from '../redux/features/todoSlice';


// const TodoFrom = () => {
//     const dispatch = useDispatch()
//     const {userTodos} = useSelector((state)=>state.todo)
//     const userId = useSelector((state)=>state.auth.userData[0].id)

//     const [todoInfo,setTodoInfo] = useState({
//     userId:userId,title:"",completed:false,endDate:"",pos:1,description:""
//     })
//     const {todoId} = useSelector((state)=>state.todo)
    
//     useEffect(()=>{
//         const getTheTodo = async () => {
//             if(todoId){
//                 const getTodo = await userTodos.find((t)=>t.id === todoId)
//                 setTodoInfo(getTodo)     
//             }
//         }
//         getTheTodo()
//     },[todoId])
    
//     const handleChange = (e) => {
//         setTodoInfo({...todoInfo,[e.target.name]:e.target.value})

//     }

//     const handleClear = () => {
//         setTodoInfo({
//             title:"",completed:false,endDate:"",pos:1,description:""
//         })
//         dispatch(removeTodoId())
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         if(!todoInfo.title){
//             return toast.error("You have to fill the Title !!")
//         }
        
//         if(todoId){ // here test if we will update todo
//             dispatch(updateTodo({todoId,todoInfo,toast}))
//         }else{
//             dispatch(createTodo({todoInfo,toast}))
//         }
        
//     }
//   return (
//     <div className='bg-[white] p-4 ' >
//         <h1 className='text-center text-3xl mb-10' >Add New Todo</h1>
//         <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
//             <input type="text"
//             className='h-10 border-2 border-[#374151] outline-none p-2'
//             placeholder='Todo title...'
//             name="title"
//             value={todoInfo?.title}
//             onChange={handleChange} />
//             <input type="text"
//             className='h-10 border-2 border-[#374151] outline-none p-2'
//             placeholder='Todo description...'
//             name="description"
//             value={todoInfo?.description}
//             onChange={handleChange} />
//             <input type="date"
//             className='h-10 border-2 border-[#374151] outline-none p-2'
//             placeholder='Todo title...'
//             name="endDate"
//             value={todoInfo?.endDate}
//             onChange={handleChange} />
//             <input type="number"
//             className='h-10 border-2 border-[#374151] outline-none p-2'
//             placeholder='Todo title...'
//             name="pos"
//             value={todoInfo?.pos}
//             onChange={handleChange} />
//             <button className='h-10 text-[white] bg-[#374151]' >{todoId ? 'Update' : 'Add'}</button>
//         </form>
//         <button className='bg-red-600 w-full h-10 mt-4 text-[white]' onClick={handleClear} >Clear</button>
//     </div>
//   )
// }

// export default TodoFrom