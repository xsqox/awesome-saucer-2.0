import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import appReducer from './appReducer/appReducer';

const store = configureStore({
    reducer: {
        app: appReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;

export default store;
