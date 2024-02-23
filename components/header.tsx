"use client";
import { MenuIcon } from "lucide-react";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import{signIn, signOut, useSession} from "next-auth/react"
export default  function Header() {
  const {data} = useSession();
  const handleLogin = async () =>{
    await signIn();
  }
  const handleSair = async () =>{
    await signOut();
  }
  return (
    <Card>
      <CardContent className="p-3 flex items-center justify-between">
        <Image src="/logo.png" alt="Barber" width={120} height={20}/>
        <Button variant="outline" size="icon">
          <MenuIcon/>
        </Button>
        {data?.user ? (<h2>{data.user.name}</h2>) : (<h2>Não</h2>)}

        {data?.user ?(<Button onClick={handleSair}>SAIR</Button>) : (<Button onClick={handleLogin}>Login</Button>)}
        
      </CardContent>
    </Card>
  )
}
