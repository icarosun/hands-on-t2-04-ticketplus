import { createSlice } from "@reduxjs/toolkit";


const SessionSlice = createSlice({
    name: 'session',
    initialState: {
        name: '',
        surname: '',
        email: ''
    },
    reducers: {
        setSession: (state, { payload }) => {
            console.log(payload);
        }
    }
})

export const { setSession } = SessionSlice.actions;
export default SessionSlice.reducer;