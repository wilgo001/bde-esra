import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    class: '',
    year: '',
    phone: '',

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setUserLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setUserEmail: (state, action) => {
            state.email = action.payload;
        },
        setUserClass: (state, action) => {
            state.class = action.payload;
        },
        setUserYear: (state, action) => {
            state.year = action.payload;
        },
        setUserPhone: (state, action) => {
            state.phone = action.payload;
        },
        addFullUserEntry: (state, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.class = action.payload.class;
            state.year = action.payload.year;
            state.phone = action.payload.phone;
        }
    }
})

export const { setUserFirstName, setUserLastName, setUserEmail, setUserClass, setUserPhone, setUserYear, addFullUserEntry } = userSlice.actions;

export default userSlice.reducer;