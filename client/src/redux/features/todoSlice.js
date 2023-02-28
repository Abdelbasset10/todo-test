import * as api from '../api'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const getUserTodos = createAsyncThunk("getUserTodos/todo", async (userId,{rejectWithValue}) => {
    try {
        const {data} = await api.getUserTodos(userId)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const createTodo = createAsyncThunk("createTodo/todo", async ({todoInfo,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.createTodo(todoInfo)
        toast.info("you have been added new todo !")
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

export const updateTodo = createAsyncThunk("updateTodo/todo", async ({todoId,todoInfo,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.updateTodo(todoId,todoInfo)
        toast.info(`you have been updated the todo of title : ${data.title} `)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

export const deleteTodo = createAsyncThunk("deleteTodo/todo", async ({todoId,toast},{rejectWithValue}) => {
    try {
        const {data} = await api.deleteTodo(todoId)
        toast.warning("you have been deleted todo !")
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

export const NestedTodos = createAsyncThunk("NestedTodos/todo", async (todoId,{rejectWithValue}) => {
    try {
        const {data} = await api.getNestedTodos(todoId)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const todoSlice = createSlice({
    name:"todo",
    initialState:{
        todoId:null,
        userTodos:[],
        nestedTodos:[],
        isLoading:false,
        error:""
    },
    reducers:{
        updateTodoId : (state, action) => {
            state.todoId = action.payload
        },
        removeTodoId : (state, action) => {
            state.todoId = null
        }

    },extraReducers:{
        [getUserTodos.pending] : (state,action) => {
            state.isLoading = true
        },
        [getUserTodos.fulfilled] : (state,action) => {
            state.isLoading = false
            state.userTodos = action.payload.sort((a, b) => a.pos - b.pos);
        },
        [getUserTodos.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [createTodo.pending] : (state,action) => {
            state.isLoading = true
        },
        [createTodo.fulfilled] : (state,action) => {
            state.isLoading = false
            state.userTodos = [...state.userTodos,action.paylaod]
        },
        [createTodo.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [updateTodo.pending] : (state,action) => {
            state.isLoading = true
        },
        [updateTodo.fulfilled] : (state,action) => {
            state.isLoading = false
            state.userTodos = state.userTodos.map((t)=>t.id === action.payload ? action.paylaod : t)
        },
        [updateTodo.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [deleteTodo.pending] : (state,action) => {
            state.isLoading = true
        },
        [deleteTodo.fulfilled] : (state,action) => {
            state.isLoading = false
            state.userTodos = state.userTodos.filter((t)=>t.id !== action.paylaod)
        },
        [deleteTodo.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        },
        [NestedTodos.pending] : (state,action) => {
            state.isLoading = true
        },
        [NestedTodos.fulfilled] : (state,action) => {
            state.isLoading = false
            console.log(action.payload)
            state.nestedTodos = action.payload
        },
        [NestedTodos.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload?.message
        }
    }
})

export const {updateTodoId, removeTodoId} = todoSlice.actions

export default todoSlice.reducer