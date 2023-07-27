import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    liked: [],
    item: null,
    movieLength: 0,
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
        setMovieLength: (state, action) => {
            state.movieLength = action.payload
        }


    }
})

export const { addToFav, addItem, setMovieLength } = likeSlice.actions

export default likeSlice.reducer