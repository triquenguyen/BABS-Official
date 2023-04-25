import { useSession, signOut, getSession } from 'next-auth/react';
import Router from 'next/router';
import loadConfig from "next/dist/server/config";
import { useEffect } from 'react';
import Image from 'next/image';
import DepositCheck from '../components/DepositCheck';
import Navbar from '../components/NavBar';
import Balance from '../components/Balance';
import { prisma } from '../../libs/prisma';

export default function ATMDashboard({balance, totalDeposit, totalWithdraw}) {
    const { status, data: session } = useSession();

    if (!session) {
        return <h1>you gotta log in {status}</h1>;
    }

    return (
        <div>
            <Image src="/mesh-757.png" width={1920} height={1080} className="hidden fixed xl:block w-[100%] z-[-1]" alt='bg' />
            <div className="px-8 py-4">
                <Navbar username={session.user?.name} callbackUrl='/atm/login' />
                <Balance amount={balance} />
            </div>
        </div>
    )
}

ATMDashboard.auth=true

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
