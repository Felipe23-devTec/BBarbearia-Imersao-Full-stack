"use client";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, User2, UserCircle2Icon } from "lucide-react";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import{signIn, signOut, useSession} from "next-auth/react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import SideMenu from "./side-menu";
export default  function Header() {
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
            <SideMenu/>
          </SheetContent>
        </Sheet>
        
        {/* {data?.user ? (<h2>{data.user.name}</h2>) : (<h2>Não</h2>)} */}

        {/* {data?.user ?(<Button onClick={handleSair}>SAIR</Button>) : (<Button onClick={handleLogin}>Login</Button>)} */}
        
      </CardContent>
    </Card>
  )
}
