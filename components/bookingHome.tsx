
import { Booking, Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "./ui/button";
interface BookingItemProps{
  booking: Prisma.BookingGetPayload<{
    include: {service: true; barbershop: true;}

  }>
}

export default function BookingHome({booking}: BookingItemProps) {
  return (
    <Card className="min-w-full md:min-w-fit bg-gray-900">
      <CardContent className="p-3 flex justify-between py-0 md:p-3">
        <div className="flex flex-col gap-3 py-3 md:px-5">
          <Badge className={`text-primary hover:text-black w-fit ${isFuture(booking.date) ? 'bg-[#45309f] text-white' : 'bg-gray-500'}`}>{isPast(booking.date) ?("Finalizado") : ("Confirmado")}</Badge>
    
          <h2 className="font-bold">{booking.service.name}</h2>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={booking.barbershop.imageUrl}/>
              <AvatarFallback>A</AvatarFallback>            
            </Avatar>
            <h3 className="text-sm">{booking.barbershop.name}</h3>
            
          </div>
          <Button className="w-full h-8 bg-red-600 text-white hover:bg-gray-500 rounded-md">Cancelar reserva</Button>
        </div>
        <div className="flex flex-col justify-center items-center px-3 border-l border-solid border-secondary">
            <p className="text-sm capitalize">{format(booking.date, "MMMM",{locale: ptBR})}</p>
            <p className="text-2xl">{format(booking.date, "dd",{locale: ptBR})}</p>
            <p className="text-sm">{format(booking.date, "HH:mm")}</p>
        </div>
      </CardContent>
    </Card>
  )
}
