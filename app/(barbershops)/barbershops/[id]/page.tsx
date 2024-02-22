import BarbershopInfo from "@/components/barbershop-info";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
interface BarbershopDetailsPage{
    params: {
        id?: string;
    }
}

export default async function BarbershopDetailsPage({params}: BarbershopDetailsPage) {
    const barbershop = await db.barbershop.findUnique({
        where:{
            id: params.id
        }
    })
    if(!barbershop){
        return(
            <h1>Nenhum registro!</h1>
        );
    }
  return (
    <BarbershopInfo barbershop={barbershop}/>
  )
}
