import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    UserMenuOpen: false,
    anchorEl: null,
};


export const appBarSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    closeUserMenu: (state) => {
        state.anchorEl = null;
        state.UserMenuOpen = false;
    },
    openUserMenu: (state, action) => {
        state.anchorEl = action.payload;
        state.UserMenuOpen = true;
      }
  },

});

export const { openUserMenu, closeUserMenu } = appBarSlice.actions;

export const AppBarData = (state) =>  state.appBar;

export default appBarSlice.reducer;
