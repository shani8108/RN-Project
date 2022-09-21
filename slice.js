import { createSlice } from '@reduxjs/toolkit';

const personSlice = createSlice({
    name: 'person',
    initialState: {
        total: 1
    },
    reducers: {
        AddNewPersons: (state, action) => {
            state.total++;
            console.log(state.total);
            console.log(action);
        },
        SelectAllPersons: (state, action) => {
            state.total--;
            console.log(state.total);
            console.log(action);
        },
        SearchPerson: (state, action) => {
            state.total--;
            console.log(state.total);
            console.log(action);
        },
        DeletePerson: (state, action) => {
            state.total--;
            console.log(state.total);
            console.log(action);
        },
        UpdatePerson: (state, action) => {
            state.total--;
            console.log(state.total);
            console.log(action);
        },
        UpdateStyle: (state, action) => {
            state.total--;
            console.log(state.total);
            console.log(action);
        }
    }

});

export const { AddNewPersons, SelectAllPersons, SearchPerson, DeletePerson, UpdatePerson, UpdateStyle } = numberSlice.actions;
export default personSlice.reducer;


