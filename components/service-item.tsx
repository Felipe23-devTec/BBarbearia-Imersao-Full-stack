"use client";

import { Service } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "@/app/helpers/hours";
interface ServiceItemProps{
    service: Service;
    isAuthenticated: boolean;
}
export default function ServiceItem({service, isAuthenticated}: ServiceItemProps) {
  const[date,setDate] = useState<Date | undefined>(new Date());
  const handleBookingclick = () =>{
    if(!isAuthenticated){
      return signIn('google')
    }
  }
  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
  };
  const timeList = useMemo(() =>{
    return date ? generateDayTimeList(date) : [];
  }, [date])
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
                        <SheetHeader className="text-left px-5 py-6 border-b border-solid border-white">
                          <SheetTitle>Fazer Reserva</SheetTitle>
                        </SheetHeader>
                        <div className="py-3">
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
                                <Button key={time}>{time}</Button>
                              ))}
                            </div>
                          )}
                        
                      </SheetContent>
                    </Sheet>
                    
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
