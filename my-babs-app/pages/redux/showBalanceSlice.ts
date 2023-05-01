import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface ShowBalanceState {
  showBalance: boolean;
}

const initialState: ShowBalanceState = {
  showBalance: false,
};

export const showBalanceSlice = createSlice({
  name: 'showBalance',
  initialState,
  reducers: {
    setShowBalance: (state, action: PayloadAction<boolean>) => {
      state.showBalance = action.payload;
    }
  },
});

export const { setShowBalance } = showBalanceSlice.actions;

export default showBalanceSlice.reducer;