"use client";
import { Card, CardContent } from "./ui/card";
import{Barbershop} from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
interface BarbershopItemProps{
    barbershop: Barbershop
}
export default function BarbershopItem({barbershop} : BarbershopItemProps) {
  const router = useRouter();

  const handleBookingClick = ()=>{
    router.push(`/barbershops/${barbershop.id}`);
  }
  return (
    <Card className="min-w-[180px] max-w-[180px] h-[280px] rounded-2xl">
        <CardContent className="p-2">
            <div className="w-full h-[150px] relative">
              <div className="absolute top-2 left-2 z-50">
                <Badge variant="secondary" className="opacity-90 flex gap-1 items-center top-2 left-2">
                  <StarIcon size={12} className="fill-purple-600 text-purple-600"/>
                  <span className="text-xs">5,0</span>
                </Badge>
              </div>
              <Image src={barbershop.imageUrl} 
                style={{objectFit: "cover"}}
                alt={barbershop.name} 
                height={0} 
                width={0} 
                sizes="100vw"
                fill 
                className="h-[150px] rounded-2xl" />
            </div>
            <h4 className="font-bold text-sm mt-2">{barbershop.name}</h4>
            <div className="h-10">
              <p className="text-[12px] text-gray-400 overflow-hidden text-ellipsis">{barbershop.address}</p>
            </div>
            <Button variant='secondary' className="w-full" onClick={handleBookingClick}>Reservar</Button>
            
        </CardContent>
    </Card>
  )
}
