import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface ShowTransactionState {
  showTransaction: boolean;
}

const initialState: ShowTransactionState = {
  showTransaction: false,
};

export const showTransactionSlice = createSlice({
  name: 'showTransaction',
  initialState,
  reducers: {
    setShowTransaction: (state, action: PayloadAction<boolean>) => {
      state.showTransaction = action.payload;
    }
  },
});

export const { setShowTransaction } = showTransactionSlice.actions;

export default showTransactionSlice.reducer;