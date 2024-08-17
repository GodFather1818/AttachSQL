"use client";

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import SignInButton from './SignInButton';

export default function Navbar() {
  const { data: session } = useSession();
  const userRole = session?.user.role;
  const Cpermissions = session?.user?.permissions.category;
  const Ppermissions = session?.user?.permissions.products;
  const Propermissions = session?.user?.permissions.projects;
  const Taskpermissions = session?.user?.permissions.tasks;

  const category = () => console.log("Category clicked");
  const products = () => console.log("Products clicked");
  const projects = () => console.log("Projects clicked");
  const tasks = () => console.log("Tasks clicked");

  return (
    <div className="fixed w-45 h-full bg-gray-100 flex flex-col">
      {/* Sidebar Section */}
      <aside className="w-[250px] fixed top-0 h-full bg-blue-950 text-white flex flex-col p-4">
        <div className="text-1xl text-blue-100 bg-blue-950 p-4 mb-5 border rounded-lg">
          Pre Dev Task
        </div>

        <div className="btn-class text-primary flex flex-col space-y-2 flex-grow">
        <Link href="/">
              <Button variant="ghost" className="w-full justify-start text-white" >Home</Button>
            </Link>
          {Cpermissions?.READ && (
            <Link href="/category">
              <Button variant="ghost" className="w-full justify-start text-white" onClick={category}>Category</Button>
            </Link>
          )}
          {Ppermissions?.READ && (
            <Link href="/products">
              <Button variant="ghost" className="w-full justify-start text-white" onClick={products}>Products</Button>
            </Link>
          )}
          {Propermissions?.READ && (
            <Link href="/projects">
              <Button variant="ghost" className="w-full justify-start text-white" onClick={projects}>Projects</Button>
            </Link>
          )}
          {Taskpermissions?.READ && (
            <Link href="/tasks">
              <Button variant="ghost" className="w-full justify-start text-white" onClick={tasks}>Tasks</Button>
            </Link>
          )}
          {userRole === 'admin' && (
            <Link href="/admin">
              <Button variant="ghost" className="w-full justify-start text-white">Users</Button>
            </Link>
          )}
        </div>
        <div className="px-10 px-4">
          <SignInButton />
        </div>
      </aside>
    </div>
  );
}