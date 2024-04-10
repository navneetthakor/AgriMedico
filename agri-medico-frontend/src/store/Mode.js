import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: "dark"
}

const ModeSlice = createSlice({
    name: "Mode",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "dark" ? "light" : "dark";
        }
    }
});

export const {setMode} = ModeSlice.actions;
export default ModeSlice.reducer;