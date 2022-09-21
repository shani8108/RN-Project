import { configureStore } from '@reduxjs/toolkit';
import slice from './slice';

const store = configureStore({
    reducer: {
        reducerPerson: slice
    }
});

export default store;
