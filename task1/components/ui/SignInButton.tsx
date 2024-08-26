"use client";
import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="">
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return (
    <div className="">
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  );
};

export default SignInButton;