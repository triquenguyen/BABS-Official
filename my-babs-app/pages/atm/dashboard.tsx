import { useSession, signOut, getSession, GetSessionParams } from 'next-auth/react';
import Router from 'next/router';
import loadConfig from "next/dist/server/config";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import DepositCheck from '../components/Deposit/DepositCheck';
import { prisma } from '../../libs/prisma';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, dispatch } from '@/libs/store';
import Withdraw from '../components/Withdraw/Withdraw';
import DepositBtn from '../components/Deposit/DepositBtn';
import WithdrawBtn from '../components/Withdraw/WithdrawBtn';
import { setShow } from '../redux/showSlice';
import { setShowWithdraw } from '../redux/showWithdrawSlice';
import { IAccount, setAccountInfo, setInit } from '../redux/accountInfo';
import Balance from '../components/Balance/BalanceCard';
import { Account } from '@prisma/client';
import NavbarATM, { NavItem } from '../components/Navbar/NavbarATM';


export default function ATMDashboard({ transactions, accounts, totalDeposit, totalWithdraw }) {
  const { status, data: session } = useSession();
  const show = useSelector((state: RootState) => state.show.show)
  const showWithdraw = useSelector((state: RootState) => state.showWithdraw.showWithdraw)
  const dispatch = useDispatch()
  const close = () => { dispatch(setShow(false)) }
  const closeWithdraw = () => { dispatch(setShowWithdraw(false)) }
  const [navItems, setNavItems] = useState<NavItem[]>([
    { name: 'Accounts', active: true },
    { name: 'Deposit', active: false },
    { name: 'Withdraw', active: false },
  ]);
  if (!session) {
    Router.replace("/atm/login")
    return;
  }
  if (!session.user?.pincode) {
    Router.replace("/atm/pincode")
    return;
  }

  return (
    <div className='md:container px-16 py-8 '>
      <NavbarATM username={session.user?.name} callbackUrl='/atm/login' navItems={navItems} setNavItems={setNavItems} />
      {/* <Image src="/mesh-757.png" width={1920} height={1080} className="hidden fixed xl:block w-[100%] z-[-1]" alt='bg' /> */}
      <div className="flex flex-col w-1/2 mx-auto h-full space-y-2 items-center justify-center">
        {checkNavActive("Accounts", navItems) && accounts.map((account: Account) => (<Balance key={account.id} accountId={account.id} balance={account.balance} type={account.type} />))}
        {checkNavActive("Deposit", navItems) && <DepositBtn />}
        {checkNavActive("Withdraw", navItems) && <WithdrawBtn />}
        {show && <DepositCheck show={show} handleClose={close} id={session.user?.id} accounts={accounts} />}
        {showWithdraw && <Withdraw showWithdraw={showWithdraw} handleClose={closeWithdraw} id={session.user?.id} accounts={accounts} />}
      </div>
    </div>
  )
}

const checkNavActive = (name: string, navs: NavItem[]) => {
  for (const nav of navs) {
    if (nav.name === name) {
      return nav.active
    }
  }
}

ATMDashboard.auth = true


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