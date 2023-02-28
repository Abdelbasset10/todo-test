import * as api from '../api'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const login = createAsyncThunk("auth/login", async({userEmail,toast,navigate},{rejectWithValue})=> {
    try {
        const {data} = await api.signIn(userEmail)
        console.log(data)
        if(data.length === 0) {
            toast.error("this user does not exist !!")
            return rejectWithValue()
        }
        navigate('/')
        toast.success("You have been signed in succefully !")
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

export const register = createAsyncThunk("auth/register", async({userEmail,toast,navigate},{rejectWithValue})=> {
    try {
        const {data} = await api.signUp(userEmail)
        navigate('/')
        toast.success("You have been signed Up succefully !")
        return data
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState:{
        userData:null,
        isLoading: false,
        error:""

    },
    reducers:{
        setUser : (state,action) => {
            state.userData = JSON.parse(localStorage.getItem("profile"))
        },
        clearUser : (state,action) => {
            localStorage.removeItem("profile")
            state.userData = null
        }

    },extraReducers:{
        [login.pending] : (state,action) => {
            state.isLoading = true
        },
        [login.fulfilled] : (state,action) => {
            state.isLoading = false
            state.userData = action.payload
            localStorage.setItem("profile",JSON.stringify({...action.payload}))
        },
        [login.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload?.message
        },
        [register.pending] : (state,action) => {
            state.isLoading = true
        },
        [register.fulfilled] : (state,action) => {
            state.isLoading = false
            state.userData = action.payload
            localStorage.setItem("profile",JSON.stringify({...action.payload}))
        },
        [register.rejected] : (state,action) => {
            state.isLoading = false
            state.error = action.payload.message
        }
    }
})

export const {setUser, clearUser} = authSlice.actions

export default authSlice.reducer