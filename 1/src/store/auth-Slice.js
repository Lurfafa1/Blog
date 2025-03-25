import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    status: false,
    userData: null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {  // Changed from reducer to reducers
        Login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },

        LogOut: (state) => {
            state.status = false;
            state.userData = null;
        }

    }
})

export const { Login, LogOut } = authSlice.actions;

export default authSlice.reducer;