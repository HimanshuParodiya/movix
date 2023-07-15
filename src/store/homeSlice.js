import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    url: {}, // storing all url/ApiConfiguration present in home section
    genres: {}, //storing all data present in home section
}

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        getApiConfiguration: (state, action) => {
            state.url = action.payload
        },
        getGenres: (state, action) => {
            state.genres = action.payload
        },
    }

})


export const { getApiConfiguration, getGenres } = homeSlice.actions

export default homeSlice.reducer