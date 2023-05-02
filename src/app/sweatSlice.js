import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    class: '',
    size: '',
    color: '',
    qte: '',
}

export const sweatSlice = createSlice({
    name: 'sweat',
    initialState,
    reducers: {
        setSweatClass: (state, action) => {
            state.class = action.payload;
        },
        setSweatSize: (state, action) => {
            state.size = action.payload;
        },
        setSweatColor: (state, action) =>{
            state.color = action.payload;
        },
        setSweatQTE: (state, action) => {
            state.qte = action.payload;
        },
        setFullSweatEntry: (state, action) => {
            state.class = action.payload.class;
            state.size = action.payload.size;
            state.color = action.payload.color;
            state.qte = action.payload.qte;
        }
    }
})

export const {setFullSweatEntry, setSweatClass, setSweatColor, setSweatSize, setSweatQTE } = sweatSlice.actions;

export default sweatSlice.reducer;