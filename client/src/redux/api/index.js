import axios from 'axios'

const API = axios.create({
    baseURL:"http://localhost:3001"
})

// Auth API
export const signUp = (userEmail) => API.post("/authentification",{email:userEmail})
export const signIn = (userEmail) => API.get(`/authentification?email=${userEmail}`)

// TODOS API
export const createTodo = (todoInfo) => API.post("/todos",todoInfo)
export const getUserTodos = (userId) => API.get(`/todos?userId=${userId}`)
export const updateTodo = (todoId,todoInfo) => API.patch(`/todos/${todoId}`,todoInfo)
export const deleteTodo = (todoId) => API.delete(`/todos/${todoId}`)

// NEST TODOS API
export const createNestedTodo = (nestedTodoInfo) => API.post("/nestedTodos",nestedTodoInfo)
export const getNestedTodos = (todoId) => API.get(`/nestedTodos?todoId=${todoId}`)
export const deleteNestedTodo = (nestedTodoId) => API.delete(`/nestedTodos/${nestedTodoId}`)
export const updateNestedTodo = (nestedTodoId,nestedTodoInfo) => API.patch(`/nestedTodos/${nestedTodoId}`,nestedTodoInfo)
