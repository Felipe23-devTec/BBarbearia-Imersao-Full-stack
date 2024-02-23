"use client";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, User2, UserCircle2Icon } from "lucide-react";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import{signIn, signOut, useSession} from "next-auth/react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
export default  function Header() {
  const {data, status} = useSession();
  const handleLogin =  async() =>{
    await signIn('google');
  }
  const handleSair = async () =>{
    await signOut();
  }
  return (
    <Card>
      <CardContent className="p-3 flex items-center justify-between">
        <Image src="/logo.png" alt="Barber" width={120} height={20}/>
        <Sheet key="left">
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon/>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] md:w-[300px] p-0">
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

            <div className="flex flex-col gap-3 px-5">
              
              <Button className="justify-start">
                <HomeIcon size={18} className="mr-2"/>
                Início</Button>
                {data?.user &&(
                  <Button className="justify-start">
                  <CalendarIcon size={18} className="mr-2"/>
                  Agendamentos</Button>
                )}
            </div>
          </SheetContent>
        </Sheet>
        
        {/* {data?.user ? (<h2>{data.user.name}</h2>) : (<h2>Não</h2>)} */}

        {/* {data?.user ?(<Button onClick={handleSair}>SAIR</Button>) : (<Button onClick={handleLogin}>Login</Button>)} */}
        
      </CardContent>
    </Card>
  )
}
