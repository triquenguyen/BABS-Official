"use client"

import { useSession, signOut, getSession } from 'next-auth/react';
import Navbar from './components/NavBar';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { prisma } from '../libs/prisma';
import { useState } from 'react';
import { motion } from 'framer-motion';

import { useDispatch, useSelector } from 'react-redux';
import { setShow } from './redux/showSlice';
import { RootState } from '@/libs/store';
import { setShowTransfer } from './redux/showTransferSlice';
import { setShowWithdraw } from './redux/showWithdrawSlice';
import { setShowTransaction } from './redux/showTransactionSlice';

import Balance from './components/Statistic/Balance';
import TotalTransfer from './components/Statistic/TotalTransfer';
import TotalWithdraw from './components/Statistic/TotalWithdraw';
import TotalDeposit from './components/Statistic/TotalDeposit';
import DepositBtn from './components/Deposit/DepositBtn';
import TransferBtn from './components/Transfer/TransferBtn';
import DepositCheck from './components/Deposit/DepositCheck';
import TransferFund from './components/Transfer/TransferFund';
import WithdrawBtn from './components/Withdraw/WithdrawBtn';
import Withdraw from './components/Withdraw/Withdraw';
import TransactionCard from './components/Transaction/TransactionCard';
import Transaction from './components/Transaction/Transaction';
import TransactionBtn from './components/Transaction/TransactionBtn';

export default function dashboard({ transactions, balance, totalDeposit, totalWithdraw }) {
  const { status, data: session } = useSession();

  const show = useSelector((state: RootState) => state.show.show)
  const showTransfer = useSelector((state: RootState) => state.showTransfer.showTransfer)
  const showWithdraw = useSelector((state: RootState) => state.showWithdraw.showWithdraw)
  const showTransaction = useSelector((state: RootState) => state.showTransaction.showTransaction)

  const dispatch = useDispatch()
  const close = () => { dispatch(setShow(false)) }
  const closeTransfer = () => { dispatch(setShowTransfer(false)) }
  const closeWithdraw = () => { dispatch(setShowWithdraw(false)) }
  const closeTransaction = () => { dispatch(setShowTransaction(false)) }


  const handleSignout = () => {
    signOut({ redirect: true, callbackUrl: '/login' })
  }

  if (!session) {
    return <h1>you gotta log in {status}</h1>;
  }

  return (
    <div>
      <Image src="/mesh-757.png" width={1920} height={1080} className="hidden fixed xl:block min-h-screen z-[-1]" alt='bg' />
      <div className="px-16 py-6">
        <Navbar username={session.user?.name} />

        <div className="mt-4 flex gap-8">
          <Balance amount={balance} />
          <DepositBtn />
          <TransferBtn />
          <WithdrawBtn />
          <TransactionBtn />
        </div>

        <button className="px-3 py-2 bg-[#69C9D0] bg-opacity-70 rounded-md text-white" onClick={handleSignout}>Sign Out</button>
      </div>

      {show && <DepositCheck show={show} handleClose={close} id={session.user?.id} />}
      {showTransfer && <TransferFund showTransfer={showTransfer} handleClose={closeTransfer} id={session.user?.id} />}
      {showWithdraw && <Withdraw showWithdraw={showWithdraw} handleClose={closeWithdraw} id={session.user?.id} />}
      {showTransaction && <Transaction showTransaction={showTransaction} handleClose={closeTransaction} transactions={transactions} />}
    </div>
  )
}

dashboard.auth = true

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id
      }, select: {
        balance: true,
        totalDeposit: true,
        totalWithdraw: true,
        transactions: true,
      }
    })

    const transactions = user?.transactions.map(transaction => ({
      ...transaction,
      createdAt: transaction.createdAt.toISOString(),
    }));


    return {
      props: {
        balance: user?.balance,
        totalDeposit: user?.totalDeposit,
        totalWithdrawals: user?.totalWithdraw,
        transactions
      }
    }
  } else {
    return {
      props: {
        balance: 0,
        totalDeposits: 0,
        totalWithdrawals: 0,
        transactions: []
      }
    }
  }
}
