import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { categoryReducer} from '../reducers/categorySlice';
import { taskReducer } from '../reducers/taskSlice';
import thunk from 'redux-thunk';

const rootReducer = combineReducers( {
    Categories: categoryReducer,
    Tasks: taskReducer
});

export const store = configureStore( {
    reducer: rootReducer,
    //middleware: [thunk]
});
