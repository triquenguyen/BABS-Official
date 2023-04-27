import { useSession, signOut, getSession } from 'next-auth/react';
import Router from 'next/router';
import loadConfig from "next/dist/server/config";
import { useEffect } from 'react';
import Image from 'next/image';
import DepositCheck from '../components/Deposit/DepositCheck';
import Navbar from '../components/NavBar';
import Balance from '../components/Statistic/Balance';
import { prisma } from '../../libs/prisma';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/libs/store';
import Withdraw from '../components/Withdraw/Withdraw';
import DepositBtn from '../components/Deposit/DepositBtn';
import WithdrawBtn from '../components/Withdraw/WithdrawBtn';
import { setShow } from '../redux/showSlice';
import { setShowWithdraw } from '../redux/showWithdrawSlice';

export default function ATMDashboard({ balance, totalDeposit, totalWithdraw }) {
    const { status, data: session } = useSession();
    const show = useSelector((state: RootState) => state.show.show)
    const showWithdraw = useSelector((state: RootState) => state.showWithdraw.showWithdraw)
    const dispatch = useDispatch()
    const close = () => { dispatch(setShow(false)) }
    const closeWithdraw = () => { dispatch(setShowWithdraw(false)) }
    if (!session || !session.user?.pincode) {
        return <h1>you gotta log in {status}</h1>;
    }

    return (
        <div>
            <Image src="/mesh-757.png" width={1920} height={1080} className="hidden fixed xl:block w-[100%] z-[-1]" alt='bg' />
            <div className="px-8 py-4">
                <Navbar username={session.user?.name} callbackUrl='/atm/login' />
                <div className="flex gap-6">
                    <Balance amount={balance} />
                    <DepositBtn />
                    <WithdrawBtn />
                </div>
                {show && <DepositCheck show={show} handleClose={close} id={session.user?.id} />}
                {showWithdraw && <Withdraw showWithdraw={showWithdraw} handleClose={closeWithdraw} id={session.user?.id} />}
            </div>
        </div>
    )
}

ATMDashboard.auth = true

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
