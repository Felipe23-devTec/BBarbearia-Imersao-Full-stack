"use client"
import { Booking, Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { cancelBooking } from "@/app/actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
interface BookingItemProps{
  booking: Prisma.BookingGetPayload<{
    include: {service: true; barbershop: true;}

  }>
}

export default function BookingItem({booking}: BookingItemProps) {
  const[isDeleteLoading, setisDeleteLoading] = useState(false);
  const handleClickCancel = async (id: string, e: any)=>{
    e.preventDefault();
    setisDeleteLoading(true);
    try{
      await cancelBooking(id);
      toast.success("Reserva cancelada com sucesso!")
    }catch (error)
    {
      console.log(error)
    }finally{
      setisDeleteLoading(false);
    }
  
  }
  return (
    <Sheet>
     <SheetTrigger asChild>
      <Card className="md:w-1/4 bg-gray-900">
        <CardContent className="p-5 flex justify-between py-0">
          <div className="flex flex-col gap-3 py-5">
            <Badge className={`text-primary hover:text-black w-fit ${isFuture(booking.date) ? 'bg-[#45309f] text-white' : 'bg-gray-500'}`}>{isPast(booking.date) ?("Finalizado") : ("Confirmado")}</Badge>
      
            <h2 className="font-bold">{booking.service.name}</h2>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={booking.barbershop.imageUrl}/>
                <AvatarFallback>A</AvatarFallback>            
              </Avatar>
              <h3 className="text-sm">{booking.barbershop.name}</h3>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center px-3 border-l border-solid border-secondary">
              <p className="text-sm capitalize">{format(booking.date, "MMMM",{locale: ptBR})}</p>
              <p className="text-2xl">{format(booking.date, "dd",{locale: ptBR})}</p>
              <p className="text-sm">{format(booking.date, "HH:mm")}</p>
          </div>
        </CardContent>
      </Card>
     </SheetTrigger>
     <SheetContent>
     <SheetHeader className="px-5 text-left pb-6">
           <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>
        <div className="px-3">
            <div className="relative h-[160px] mt-6 w-full">
              <Image src="/barbershop-map.png" alt="map" fill/>
              <div className="absolute w-full bottom-4 left-0 px-3">
                <Card>
                  <CardContent className="p-3 flex gap-3 items-center">
                    <Avatar>
                      <AvatarImage src={booking.barbershop.imageUrl}/>
                    </Avatar>
                    <div className="">
                       <h2 className="font-bold">{booking.barbershop.name}</h2>
                       <h3 className="text-xs">{booking.barbershop.address}</h3>
                    </div>
                  </CardContent>
                  
                </Card>
                
              </div>
              
              
           </div>
            </div>
            <div className="px-2">
            <Badge className={`text-primary m-4 hover:text-black w-fit ${isFuture(booking.date) ? 'bg-[#45309f] text-white' : 'bg-gray-500'}`}>{isPast(booking.date) ?("Finalizado") : ("Confirmado")}</Badge>
            <Card>
            <CardContent className="p-3">
                                <div className="flex justify-between">
                                  <h2 className="font-bold">Barbearia </h2>
                                  <h2 className="font-bold">{booking.barbershop.name}</h2>
                                </div>
                                <div className="flex justify-between">
                                  <h2 className="font-bold text-sm">{booking.service.name}</h2>
                                  <h3 className="font-bold text-sm">{Intl.NumberFormat("pt-BR",{
                                  style: "currency",
                                  currency: "BRL"
                                }).format((Number(booking.service.price)))}</h3>
                                </div>
                                
                                  <div className="flex justify-between">
                                    <h3 className="text-gray-400 text-sm">Data</h3>
                                    <h4 className="text-gray-400 text-sm">{format(booking.date, "dd 'de' MMMM",{
                                      locale: ptBR,
                                    })}</h4>
                                  </div>
                              
                                
                                  <div className="flex justify-between">
                                    <h3 className="text-gray-400 text-sm">Hora</h3>
                                    <h4 className="text-gray-400 text-sm">{format(booking.date, 'HH:mm')}</h4>
                                  </div>
                              
                              </CardContent>                          
          </Card>
          <SheetFooter className="mt-6">
            <SheetClose asChild>
                <Button className="w-full" variant="secondary">Voltar</Button>
            </SheetClose>
            
              <AlertDialog>
                <AlertDialogTrigger asChild>
                <Button disabled={!isFuture(booking.date)} className="w-full mb-5" variant="destructive">
              
              Cancelar Reserva</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Você tem certeza que deseja cancelar esta reserva?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-700 text-white hover:bg-gray-600" disabled={isDeleteLoading} onClick={(e) => handleClickCancel(booking.id, e)}>
                    {isDeleteLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>}
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </SheetFooter>
            </div>
     </SheetContent>
    
    </Sheet>
  )
}