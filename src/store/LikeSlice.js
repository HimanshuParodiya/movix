import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    liked: [],
    updatedFav: []
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
        updateFav: (state, action) => {
            // state.liked.push(action.payload)
            return {
                ...state,
                updatedFav: [...state.updatedFav, action.payload],
            };
        },

    }
})

export const { addToFav, updatedFav } = likeSlice.actions

export default likeSlice.reducer