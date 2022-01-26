import { createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle',
  userName: '',
  email:'',
  data: [],
};


export const userSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    updateUserDetails: (state, action) => {
      state.email = action.payload.email;
      state.userName = action.payload.username;
    }
  },

});

export const { increment, updateUserDetails } = userSlice.actions;

export const userData = (state) =>  state.user;

export default userSlice.reducer;
