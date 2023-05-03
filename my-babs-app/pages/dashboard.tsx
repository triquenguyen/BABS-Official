"use client"
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */

import { useSession, signOut, getSession, GetSessionParams } from 'next-auth/react';
import Navbar from './components/Navbar/Navbar';
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
import { setShowAccount } from './redux/showAccountSlice';
import { setShowBalance } from './redux/showBalanceSlice';
import { setShowProfile } from './redux/showProfileSlice';

import Balance from './components/Balance/Balance';
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
import CreateAccount from './components/Account/CreateAccount';
import CreateAccountBtn from './components/Account/CreateAccountBtn';
import AccountManagement from './components/Account/AccountManagement';
import BalanceList from './components/Balance/BalanceList';
import Profile from './components/Profile/Profile';
import Footer from './components/Footer';


export default function dashboard({ transactions, accounts, totalDeposit, totalWithdraw, firstName, lastName, email }) {
  const { status, data: session } = useSession();
  const [account, setAccount] = useState(accounts[1])

  const show = useSelector((state: RootState) => state.show.show)
  const showTransfer = useSelector((state: RootState) => state.showTransfer.showTransfer)
  const showWithdraw = useSelector((state: RootState) => state.showWithdraw.showWithdraw)
  const showTransaction = useSelector((state: RootState) => state.showTransaction.showTransaction)
  const showAccount = useSelector((state: RootState) => state.showAccount.showAccount)
  const showBalance = useSelector((state: RootState) => state.showBalance.showBalance)
  const showProfile = useSelector((state: RootState) => state.showProfile.showProfile)

  const dispatch = useDispatch()
  const close = () => { dispatch(setShow(false)) }
  const closeTransfer = () => { dispatch(setShowTransfer(false)) }
  const closeWithdraw = () => { dispatch(setShowWithdraw(false)) }
  const closeTransaction = () => { dispatch(setShowTransaction(false)) }
  const closeAccount = () => { dispatch(setShowAccount(false)) }
  const closeBalance = () => { dispatch(setShowBalance(false)) }
  const closeProfile = () => { dispatch(setShowProfile(false)) }



  if (!session) {
    return <h1>you gotta log in {status}</h1>;
  }

  return (
    <div>
      <Image src="/mesh-757.png" width={1920} height={1080} className="hidden fixed xl:block min-h-screen z-[-1]" alt='bg' />
      <div className="px-16 py-8"
        style={{ height: "90vh", overflowY: "hidden" }}>
        <Navbar username={`${firstName} ${lastName}`} />

        <div className="mt-6 flex flex-wrap gap-14 justify-center items-center">
          <Balance accounts={accounts} />
          <DepositBtn />
          <TransferBtn />
          <WithdrawBtn />
          <TransactionBtn />
          <CreateAccountBtn />
        </div>


      </div>

      <Footer />

      {show && <DepositCheck show={show} handleClose={close} id={session.user?.id} accounts={accounts} />}
      {showTransfer && <TransferFund showTransfer={showTransfer} handleClose={closeTransfer} id={session.user?.id} />}
      {showWithdraw && <Withdraw showWithdraw={showWithdraw} handleClose={closeWithdraw} id={session.user?.id} accounts={accounts} />}
      {showTransaction && <Transaction showTransaction={showTransaction} handleClose={closeTransaction} transactions={transactions} />}
      {showAccount && <AccountManagement showAccount={showAccount} handleClose={closeAccount} id={session.user?.id} />}
      {showBalance && <BalanceList showBalance={showBalance} handleClose={closeBalance} accounts={accounts} />}
      {showProfile && <Profile showProfile={showProfile} handleClose={closeProfile} id={session.user?.id} firstName={firstName} lastName={lastName} email={email} />}
    </div>
  )
}

dashboard.auth = true

export async function getServerSideProps(context: GetSessionParams | undefined) {
  const session = await getSession(context);

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id
      }, select: {
        totalDeposit: true,
        totalWithdraw: true,
        transactions: true,
        accounts: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
      }
    })

    const transactions = user?.transactions.map(transaction => ({
      ...transaction,
      createdAt: transaction.createdAt.toISOString(),
    }));

    const accounts = user?.accounts.map(account => ({
      ...account,
      createdAt: account.createdAt.toISOString(),
    }));


    return {
      props: {
        totalDeposit: user?.totalDeposit,
        totalWithdrawals: user?.totalWithdraw,
        transactions,
        accounts,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
      }
    }
  } else {
    return {
      props: {
        balance: 0,
        totalDeposits: 0,
        totalWithdrawals: 0,
        transactions: [],
        accounts: [],
        firstName: '',
        lastName: '',
        email: '',
      }
    }
  }
}
