import { useSession, signOut, getSession } from 'next-auth/react';
import Navbar from './components/NavBar';
import Image from 'next/image';
import DepositCheck from './components/DepositCheck';
import { GetServerSideProps } from 'next';
import { prisma } from '../libs/prisma';
import { useEffect, useState } from 'react';

interface DashboardProps {
  balance: number;
  totalDeposits: number;
  totalWithdrawals: number;
}



export default function dashboard() {
  const { status, data: session } = useSession();
  const [dashboard, setDashboard] = useState<DashboardProps>({ balance: 0, totalDeposits: 0, totalWithdrawals: 0 });

  const handleSignout = () => {
    signOut({ redirect: true, callbackUrl: '/login' })
  }

  if (!session) {
    return <h1>you gotta log in {status}</h1>;
  }

  useEffect(() => {
    const fetchUser = async () => {

      const user = await prisma.user.findUnique({
        where: {
          id: session.user?.id
        }, select: {
          balance: true,
          totalDeposit: true,
          totalWithdraw: true
        }
      })

      setDashboard({
        balance: Number (user?.balance),
        totalDeposits: Number (user?.totalDeposit) ,
        totalWithdrawals: Number (user?.totalWithdraw)
      })
    }
  }, [])

  return (
    <div>
      <Image src="/mesh-757.png" width={1920} height={1080} className="hidden fixed xl:block w-[100%] z-[-1]" alt='bg' />
      <div className="px-8 py-4">
        <Navbar username={session.user?.name} />
        <DepositCheck id={session.user?.id} />
        <h1>Balance {dashboard.balance}</h1>
        <h1>Total Deposits {dashboard.totalDeposits}</h1>
        <h1>Total Withdrawals {dashboard.totalWithdrawals}</h1>
        <button className="px-3 py-2 bg-[#69C9D0] bg-opacity-70 rounded-md text-white" onClick={handleSignout}>Sign Out</button>
      </div>
    </div>
  )
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (session) {
//     const user = await prisma.user.findUnique({
//       where: {
//         id: session?.user?.id
//       }, select: {
//         balance: true,
//         totalDeposit: true,
//         totalWithdraw: true
//       }
//     })

//     return {
//       props: {
//         balance: user?.balance,
//         totalDeposits: user?.totalDeposit,
//         totalWithdrawals: user?.totalWithdraw
//       }
//     }
//   } else {
//     return {
//       props: {
//         balance: 0,
//         totalDeposits: 0,
//         totalWithdrawals: 0
//       }
//     }
//   }
// }
