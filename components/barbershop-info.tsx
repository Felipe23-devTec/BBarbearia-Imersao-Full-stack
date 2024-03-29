"use client";
import { Button } from "@/components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";
interface BarbershopInfoProps{
    barbershop: Barbershop
}
export default function BarbershopInfo({barbershop}: BarbershopInfoProps) {
    const router = useRouter();
    const handleBackClick = () =>{
        router.replace('/');
    }
  return (
    <div>
        <div className="h-[250px] w-full relative">
            <Button size="icon" variant="outline" className="absolute z-50 top-4 left-4" onClick={handleBackClick}>
                <ChevronLeftIcon/>
            </Button>
            <Sheet key="left">
                <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="absolute z-50 top-4 right-4">
                    <MenuIcon/>
                </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[250px] md:w-[300px] p-0">
                    <SideMenu/>
                </SheetContent>
            </Sheet>
            
            <Image 
            src={barbershop?.imageUrl} 
            alt={barbershop?.name} 
            fill 
            style={{objectFit: "cover"}} 
            className="opacity-75"/>

        </div>
        <div className="px-5 py-3">
            <h1 className="text-xl font-bold">{barbershop.name}</h1>
            <div className="flex items-center gap-2 mt-2">
                <MapPinIcon className="fill-purple-600"/>
                <p className="text-sm">{barbershop.address}</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
                <StarIcon className="fill-purple-600"/>
                <p className="text-sm">5,0 (899 avaliações)</p>
            </div>
            
        </div>
    </div>
  )
}
