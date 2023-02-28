import {createSlice} from '@reduxjs/toolkit'

const modalSlice = createSlice({
    name:"modal",
    initialState:{
        todoId:null,
        nestedTodoId:null,
        nestedTodoModal:false,
        todoModal:false
    },
    reducers:{
        AddNestesTodoModal : (state,action) => {
            state.nestedTodoModal = true
            state.todoModal = false
        },
        AddTodoModal : (state,action) => {
            state.todoModal = true
            state.nestedTodoId = false
        }, 
        closeModal : (state, action) => {
            state.nestedTodoModal = false
            state.todoModal = false
            state.nestedTodoId = null
            state.todoId = null
        },
        updateNestedTodoModal : (state, action) => {
            state.nestedTodoModal = true
            state.nestedTodoId = action.payload
        },
        updateTodoModal : (state, action) => {
            state.todoModal = true
            state.todoId = action.payload
        }
    },
    extraReducers:{
    }
})

export const {AddNestesTodoModal, closeModal, updateNestedTodoModal, AddTodoModal, updateTodoModal} = modalSlice.actions

export default modalSlice.reducer