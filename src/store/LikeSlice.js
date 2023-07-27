import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    liked: [],
    item: null,
}

const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {
        addToFav: (state, action) => {
            // state.liked.push(action.payload)
            return {
                ...state,
                liked: [...state.liked, action.payload],
            };
        },
        addItem: (state, action) => {
            // state.liked.push(action.payload)
            state.item = action.payload
        },


    }
})

export const { addToFav, addItem } = likeSlice.actions

export default likeSlice.reducer