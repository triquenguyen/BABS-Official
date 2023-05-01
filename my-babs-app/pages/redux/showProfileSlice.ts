import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface ShowProfileState {
  showProfile: boolean;
}

const initialState: ShowProfileState = {
  showProfile: false,
};

export const showProfileSlice = createSlice({
  name: 'showProfile',
  initialState,
  reducers: {
    setShowProfile: (state, action: PayloadAction<boolean>) => {
      state.showProfile = action.payload;
    }
  },
});

export const { setShowProfile } = showProfileSlice.actions;

export default showProfileSlice.reducer;