import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
export default function Header() {
  return (
    <Card>
      <CardContent className="p-5 flex items-center justify-between">
        <Image src="/logo.png" alt="Barber" width={120} height={22}/>
        <Button variant="outline" size="icon">
          <MenuIcon/>
        </Button>
      </CardContent>
    </Card>
  )
}
