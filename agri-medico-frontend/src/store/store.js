import { configureStore } from "@reduxjs/toolkit";
import ModeSlice from "./Mode";

const store = configureStore({
    reducer: {
        currMode: ModeSlice
    }
})

export default store;