"use client";
import React, {useState} from 'react';
import { useSession, signOut, signIn } from 'next-auth/react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { Button } from './button';
import { ScrollArea } from "@/components/ui/scroll-area"


export default function SideBar() {
  const { data: session } = useSession();


  return (
    <div className="fixed w-64 h-full bg-blue-950 text-white flex flex-col p-4">
      <div className="text-xl text-blue-100 bg-blue-950 p-4 mb-5 border rounded-lg">
        Pre Dev Task
      </div>

      <div className="flex-grow">
        {session ? (
          <>
          <Link href="/files">
            <Button variant="ghost" className="w-full justify-start text-white">
              Files
            </Button>
          </Link>
          <Button variant="ghost" className='w-full justify-start text-white' onClick={() => signOut({ callbackUrl: '/' })}>
            Sign Out
          </Button>
          </>
        ) : (
          <Link href="/api/auth/signin">
            <Button variant="ghost" className="w-full justify-start text-white">
              Sign In
            </Button>
          </Link>
        )}
      </div>

      {!session && (
        <div className="text-sm text-center mt-4">
          If not yet signed in, <Link href="/auth/register" className="text-blue-300 hover:underline">click here to register</Link>.
        </div>
      )}
    </div>
  );
}