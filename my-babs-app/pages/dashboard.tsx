"use client"

import { useSession, signOut, getSession } from 'next-auth/react';
import Navbar from './components/NavBar';
import Image from 'next/image';
import DepositCheck from './components/DepositCheck';
import { GetServerSideProps } from 'next';
import { prisma } from '../libs/prisma';
import { Balance } from './components/Balance';
import { TotalTransfer } from './components/TotalTransfer';
import { TotalWithdraw } from './components/TotalWithdraw';
import { TotalDeposit } from './components/TotalDeposit';

export default function Dashboard({ balance, totalDeposits, totalWithdraw }) {
  const { status, data: session } = useSession();

  const handleSignout = () => {
    signOut({ redirect: true, callbackUrl: '/login' })
  }

  if (!session) {
    return <h1>you gotta log in {status}</h1>;
  }

  return (
    <div>
      <Image src="/mesh-757.png" width={1920} height={1080} className="hidden fixed xl:block w-[100%] z-[-1]" alt='bg' />
      <div className="px-8 py-4">
        <Navbar username={session.user?.name} />
        <DepositCheck id={session.user?.id} />
        {/* <Balance amount={balance} />
        <TotalDeposit amount={totalDeposits} />
        <TotalWithdraw amount={totalWithdraw} /> */}
        <h1>Balance {balance}</h1>
        <button className="px-3 py-2 bg-[#69C9D0] bg-opacity-70 rounded-md text-white" onClick={handleSignout}>Sign Out</button>
      </div>
    </div>
  )
}

Dashboard.auth=true
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
        totalDeposits: user?.totalDeposit,
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
