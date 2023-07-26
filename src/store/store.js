import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";
import likeSlice from "./LikeSlice";

const store = configureStore({
    reducer: {
        home: homeSlice,
        fav: likeSlice
    },
});

export default store;
