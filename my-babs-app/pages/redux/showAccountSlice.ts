import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface ShowAccountState {
  showAccount: boolean;
}

const initialState: ShowAccountState = {
  showAccount: false,
};

export const showAccountSlice = createSlice({
  name: 'showAccount',
  initialState,
  reducers: {
    setShowAccount: (state, action: PayloadAction<boolean>) => {
      state.showAccount = action.payload;
    }
  },
});

export const { setShowAccount } = showAccountSlice.actions;

export default showAccountSlice.reducer;