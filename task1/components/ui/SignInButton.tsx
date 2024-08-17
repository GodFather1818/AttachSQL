"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { signOut } from 'next-auth/react';

import Button from 'next/'
const SignInButton = () => {

    const {data:session} = useSession();
    const logout=()=>{
        // window.location.reload()
        
        signOut();

    }

    if (session && session.user){


 

      return (
        <div className="flex gap-4 ml-auto">
          {/* <p className="text-black bg-white m-auto px-2 py-1">User: {session?.user.name} Role: {session?.user.role}</p> */}
          <Link
            href={"/api/auth/signout"}
            className="flex gap-4 ml-auto text-blue-600 bg-white px-2 py-1"
            >
            Sign Out
          </Link>
        </div>
      );
    }
  
    return (
      <div className="flex gap-4 ml-auto items-center">
        <Link
          href={"/api/auth/signin"}
          className="flex gap-4 ml-auto  text-blue-600 bg-white px-2 py-1"
        >
          Sign In
        </Link>
        
      </div>
    );
  };
export default SignInButton
