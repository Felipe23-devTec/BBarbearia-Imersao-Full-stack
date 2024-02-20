
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";


export default function BookingItem() {
  return (
    <Card className="md:w-1/4">
      <CardContent className="p-5 flex justify-between py-0">
        <div className="flex flex-col gap-3 py-5">
          <Badge className="bg-[#45309f] text-primary hover:text-black w-fit">Confirmado</Badge>
          <h2 className="font-bold">Corte de Cabelo</h2>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png"/>
              <AvatarFallback>A</AvatarFallback>            
            </Avatar>
            <h3 className="text-sm">Vintage Barber</h3>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center px-3 border-l border-solid border-secondary">
            <p className="text-sm">Fevereiro</p>
            <p className="text-2xl">06</p>
            <p className="text-sm">09:45</p>
        </div>
      </CardContent>
    </Card>
  )
}
