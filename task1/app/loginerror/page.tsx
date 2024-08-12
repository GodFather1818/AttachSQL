"use client"

import React from "react"
import { useRouter } from 'next/navigation';

const page = () => {

  const router = useRouter();
  setTimeout(()=>{
    router.push('/api/auth/signin')
  },2000)
  return (
    <div className="bg-black h-screen " >
        <div className=" flex-col justify-center"></div>
      <h1 className="text-white  text-5xl">User Should be Logged IN!</h1>

    </div>
  )
}

export default page
