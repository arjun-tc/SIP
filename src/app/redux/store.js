import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import DrawerReducer from './drawerSlice';
import AppBarReducer from './appBarSlice';

export const store = configureStore({
  reducer: {
    user : userReducer,
    drawer : DrawerReducer, 
    appBar : AppBarReducer,
  },
});
