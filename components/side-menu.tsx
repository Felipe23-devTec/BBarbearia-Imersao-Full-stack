"use client";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, User2, UserCircle2Icon } from "lucide-react";

import { Button } from "./ui/button";
import{signIn, signOut, useSession} from "next-auth/react"
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";


export default function SideMenu() {
    const {data, status} = useSession();
  const handleLogin =  async() =>{
    await signIn('google');
  }
  const handleSair = async () =>{
    await signOut();
  }
  return (
    <>
      <SheetHeader className="text-left border-b border-solid border-primary p-5">
                <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            {data?.user ? (
              <div className="flex justify-between px-5 py-6 items-center">
                 <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={data?.user.image ?? ""}/>
                </Avatar>
                <h2 className="font-bold">{data.user.name}</h2>
              </div>
              <Button variant="secondary" size='icon' onClick={handleSair}>
                 <LogOutIcon/>
              </Button>
              </div>
             
            ):(
              <div className="flex flex-col px-5 py-6">
                <div className="flex items-center gap-3">
                  <UserCircle2Icon size={28}/>
                  <h2 className="font-bold">Olá, faça o seu login!</h2>
                </div>
                
                <Button variant="secondary" className="mt-5" onClick={handleLogin}>
                  <LogInIcon className="mr-2"/>
                   Fazer Login
                </Button>
              </div>
            )}

            <div className="flex flex-col gap-3 px-5 border-t pt-8 border-solid border-primary">
              
              <a href="/" className="flex pl-5 items-center text-black bg-white py-2 rounded-md hover:bg-slate-400">
                <HomeIcon size={18} className="mr-2"/>
                Início</a>
                {data?.user &&(
                  <a href="/bookings" className="flex pl-5 items-center text-black bg-white py-2 rounded-md hover:bg-slate-400">
                  <CalendarIcon size={18} className="mr-2"/>
                  Agendamentos</a>
                )}
            </div>
    </>
  )
}
