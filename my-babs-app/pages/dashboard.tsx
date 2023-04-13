import { useSession, signOut } from 'next-auth/react';
import Router from 'next/router';
import loadConfig from "next/dist/server/config";
import { useEffect } from 'react';
import Navbar from './components/NavBar';
import Image from 'next/image';

export default function dashboard() {
  const { status, data: session } = useSession();

  if (!session) {
    return <h1>you gotta log in {status}</h1>;
  }

  return (
    <div>
      <Image src="/mesh-757.png" width={1920} height={1080} className="hidden fixed xl:block w-[100%] z-[-1]" alt='bg' />
      <div className="px-8 py-4">
        <Navbar username={session.user?.name} />
        <button className="px-3 py-2 bg-[#69C9D0] rounded-md text-white" onClick={() => signOut()}>Sign Out</button>
      </div>

    </div>
  )
}
