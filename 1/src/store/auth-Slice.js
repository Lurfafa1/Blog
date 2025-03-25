import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: localStorage.getItem('auth_status') === 'true',
    userData: JSON.parse(localStorage.getItem('auth_user'))
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        Login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            localStorage.setItem('auth_status', 'true');
            localStorage.setItem('auth_user', JSON.stringify(action.payload));
        },

        LogOut: (state) => {
            state.status = false;
            state.userData = null;
            localStorage.removeItem('auth_status');
            localStorage.removeItem('auth_user');
        }
    }
})

export const { Login, LogOut } = authSlice.actions;

export default authSlice.reducer;