import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-Slice'

const Store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export default Store