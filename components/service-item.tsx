"use client";

import { Barbershop, Service } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image";
import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "@/app/helpers/hours";
import { format, setHours, setMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { saveBooking } from "@/app/actions/save-booking";
interface ServiceItemProps{
    barbershop: Barbershop;
    service: Service;
    isAuthenticated: boolean;
}
export default function ServiceItem({service, barbershop,isAuthenticated}: ServiceItemProps) {
  const{data} = useSession();
  const[date,setDate] = useState<Date | undefined>(new Date());
  const[hour,setHour] = useState<string | undefined>();
  const handleBookingclick = () =>{
    if(!isAuthenticated){
      return signIn('google')
    }
  }
  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };
  const hendleHourClick = (time: string)=>{
    setHour(time);
  }
  const timeList = useMemo(() =>{
    return date ? generateDayTimeList(date) : [];
  }, [date])

  const handleBookingSubimit = async ()=>{
    try {
      if(!hour || !date || !data?.user){
        return;
      }
      const newDate = setMinutes(setHours(date, Number(hour.split(':')[0])),Number(hour.split(':')[1]));
      await saveBooking({
        serviceId: service.id,
        barbersshopId: barbershop.id,
        date: newDate,
        userId: (data.user as any).id,

      });
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Card className="my-2 md:w-1/4 md:m-4">
      <CardContent className="p-3">
        <div className="flex gap-4 items-center">
            <div className="relative h-[110px] w-[130px] md:w-[150px]">
            <Image 
                className="rounded-lg"
                src={service?.imageUrl} 
                alt={service?.name} 
                fill 
                style={{objectFit: "cover"}} 
                />
            </div>
            <div className="flex flex-col">
                <h2 className="font-bold">{service.name}</h2>
                <p className="text-sm text-gray-400">{service.description}</p>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-bold">{Intl.NumberFormat("pt-BR",{
                        style: "currency",
                        currency: "BRL"
                    }).format((Number(service.price)))}</p>
                    
                    <Sheet key="left">
                      <SheetTrigger asChild>
                        <Button variant="secondary" onClick={handleBookingclick}>Reservar</Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-[300px] p-0">
                        <SheetHeader className="text-left px-5 py-3 border-b border-solid border-white">
                          <SheetTitle>Fazer Reserva</SheetTitle>
                        </SheetHeader>
                        <div className="py-2">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={handleDateClick}
                              fromDate={new Date()}
                              styles={{
                                button: {
                                  width: "100%",
                                },
                                nav_button_previous: {
                                  width: "32px",
                                  height: "32px",
                                },
                                nav_button_next: {
                                  width: "32px",
                                  height: "32px",
                                },
                                caption: {
                                  textTransform: "capitalize",
                                },
                              }}
                            />
                          </div>
                          {date && (
                            <div className="flex gap-3 overflow-x-auto py-3 px-5 border-t border-solid border-secondary">
                              {timeList.map((time) => (
                                <Button key={time} className={`rounded-full hover:text-white hover:bg-slate-500 ${hour === time ? 'bg-purple-600 text-white' : ''}`} onClick={() => hendleHourClick(time)}>{time}</Button>
                              ))}
                            </div>
                          )}

                          <div className="py-2 mt-2">
                            <Card>
                              <CardContent className="p-3">
                                <div className="flex justify-between">
                                  <h2 className="font-bold text-sm">{service.name}</h2>
                                  <h3 className="font-bold text-sm">{Intl.NumberFormat("pt-BR",{
                                  style: "currency",
                                  currency: "BRL"
                                }).format((Number(service.price)))}</h3>
                                </div>
                                {date &&(
                                  <div className="flex justify-between">
                                    <h3 className="text-gray-400 text-sm">Data</h3>
                                    <h4 className="text-gray-400 text-sm">{format(date, "dd 'de' MMMM",{
                                      locale: ptBR,
                                    })}</h4>
                                  </div>
                                )}
                                {hour &&(
                                  <div className="flex justify-between">
                                    <h3 className="text-gray-400 text-sm">Hora</h3>
                                    <h4 className="text-gray-400 text-sm">{hour}</h4>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </div>
                          <SheetFooter className="w-full flex justify-end gap-2 px-5">
                            <Button>Voltar</Button>
                            <Button disabled={!date || !hour} className="bg-purple-600 text-white hover:bg-slate-400" onClick={handleBookingSubimit}>Confirmar Reserva</Button>
                          </SheetFooter>
                        
                      </SheetContent>
                    </Sheet>
                    
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
