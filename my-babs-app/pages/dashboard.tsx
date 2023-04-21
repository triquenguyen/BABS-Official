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

import Balance from './components/Balance';
import TotalTransfer from './components/TotalTransfer';
import TotalWithdraw from './components/TotalWithdraw';
import TotalDeposit from './components/TotalDeposit';
import DepositBtn from './components/DepositBtn';
import TransferBtn from './components/TransferBtn';
import DepositCheck from './components/DepositCheck';
import TransferFund from './components/TransferFund';
import WithdrawBtn from './components/WithdrawBtn';
import Withdraw from './components/Withdraw';

export default function dashboard({ balance, totalDeposit, totalWithdraw }) {
  const { status, data: session } = useSession();
  const show = useSelector((state:RootState) => state.show.show)
  const showTransfer = useSelector((state:RootState) => state.showTransfer.showTransfer)
  const showWithdraw = useSelector((state:RootState) => state.showWithdraw.showWithdraw)
  const dispatch = useDispatch()
  const close = () => {dispatch(setShow(false))}
  const closeTransfer = () => {dispatch(setShowTransfer(false))}
  const closeWithdraw = () => {dispatch(setShowWithdraw(false))}


  const handleSignout = () => {
    signOut({ redirect: true, callbackUrl: '/login' })
  }

  if (!session) {
    return <h1>you gotta log in {status}</h1>;
  }

  return (
    <div>
      <Image src="/mesh-757.png" width={1920} height={1080} className="hidden fixed xl:block min-h-screen z-[-1]" alt='bg' />
      <div className="px-8 py-4">
        <Navbar username={session.user?.name} />
        
        <div className="flex gap-6">
          <Balance amount={balance} />
          <DepositBtn />
          <TransferBtn />
          <WithdrawBtn />
        </div>
        
        <button className="px-3 py-2 bg-[#69C9D0] bg-opacity-70 rounded-md text-white" onClick={handleSignout}>Sign Out</button>
      </div>

      {show && <DepositCheck show={show} handleClose={close} id={session.user?.id} />}
      {showTransfer && <TransferFund showTransfer={showTransfer} handleClose={closeTransfer} id={session.user?.id} />}
      {showWithdraw && <Withdraw showWithdraw={showWithdraw} handleClose={closeWithdraw} id={session.user?.id} />}

    </div>
  )
}

dashboard.auth=true

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id
      }, select: {
        balance: true,
        totalDeposit: true,
        totalWithdraw: true
      }
    })

    return {
      props: {
        balance: user?.balance,
        totalDeposit: user?.totalDeposit,
        totalWithdrawals: user?.totalWithdraw
      }
    }
  } else {
    return {
      props: {
        balance: 0,
        totalDeposits: 0,
        totalWithdrawals: 0
      }
    }
  }
}
