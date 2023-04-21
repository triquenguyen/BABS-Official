import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface ShowTransferState {
  showTransfer: boolean;
}

const initialState: ShowTransferState = {
  showTransfer: false,
};

export const showTransferSlice = createSlice({
  name: 'showTransfer',
  initialState,
  reducers: {
    setShowTransfer: (state, action: PayloadAction<boolean>) => {
      state.showTransfer = action.payload;
    }
  },
});

export const { setShowTransfer } = showTransferSlice.actions;

export default showTransferSlice.reducer;