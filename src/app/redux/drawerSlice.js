import { createSlice} from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit'

const initialState = {
  drawerOpen: true,
  profileOpen: false,
};


export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
        state.drawerOpen = !state.drawerOpen;
    },
    toggleProfile: (state) => {
        state.profileOpen = !state.profileOpen;
    },
    handleResize: (state, action) => {
      state.drawerOpen = action.payload < 600 ? false : state.drawerOpen;
      console.log(current(state))
    }
  },
});

export const { toggleDrawer, toggleProfile, handleResize } = drawerSlice.actions;

export const drawerData = (state) =>  state.drawer;

export default drawerSlice.reducer;
