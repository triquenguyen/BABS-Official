import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface ShowWithdrawState {
  showWithdraw: boolean;
}

const initialState: ShowWithdrawState = {
  showWithdraw: false,
};

export const showWithdrawSlice = createSlice({
  name: 'showWithdraw',
  initialState,
  reducers: {
    setShowWithdraw: (state, action: PayloadAction<boolean>) => {
      state.showWithdraw = action.payload;
    }
  },
});

export const { setShowWithdraw } = showWithdrawSlice.actions;

export default showWithdrawSlice.reducer;