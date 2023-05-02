import { createSlice } from "@reduxjs/toolkit"


export const initialState = {
    token: "",
}

export const adminLogSlice = createSlice({
    name: "adminLog",
    initialState,
    reducers: {
        LogIn: (state, action) => {
            state.token = action.payload;
        },
        LogOut: (state) => {
            state.token = "";
        }
    }
})

export const { LogIn, LogOut } = adminLogSlice.actions;

export default adminLogSlice.reducer;