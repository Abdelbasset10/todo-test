import {configureStore} from '@reduxjs/toolkit'

import authSlice from './features/authSlice'
import todoSlice from './features/todoSlice'
import modalSlice from './features/modalSlice'

const store = configureStore({
    reducer:{
        auth:authSlice,
        todo:todoSlice,
        modal:modalSlice
    }
})

export default store