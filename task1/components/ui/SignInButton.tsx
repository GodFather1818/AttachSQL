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
        <div className="">
          {/* <p className="text-black bg-white m-auto px-2 py-1">User: {session?.user.name} Role: {session?.user.role}</p> */}
          <Link
            href={"/api/auth/signout"}
           
            >
            Sign Out
          </Link>
        </div>
      );
    }
  
    return (
      <div className="">
        <Link
          href={"/api/auth/signin"}
        >
          Sign In
        </Link>
        
      </div>
    );
  };
export default SignInButton
