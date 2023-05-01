import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface AccoundIdState {
  accountId: number;
}

const initialState: AccoundIdState = {
  accountId: 0,
};

export const accountIdSlice = createSlice({
  name: 'accountId',
  initialState,
  reducers: {
    setAccountId: (state, action: PayloadAction<number>) => {
      state.accountId = action.payload;
    }
  },
});

export const { setAccountId } = accountIdSlice.actions;

export default accountIdSlice.reducer;