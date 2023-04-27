import { configureStore } from '@reduxjs/toolkit'
import showReducer from '../pages/redux/showSlice'
import showTransferReducer from '../pages/redux/showTransferSlice'
import showWithdrawReducer from '@/pages/redux/showWithdrawSlice'
import showTransactionSlice from '@/pages/redux/showTransactionSlice'

export const store = configureStore({
  reducer: {
    show: showReducer,
    showTransfer: showTransferReducer,
    showWithdraw: showWithdrawReducer,
    showTransaction: showTransactionSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
