
import BarbershopInfo from "@/components/barbershop-info";
import ServiceItem from "@/components/service-item";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
interface BarbershopDetailsPage{
    params: {
        id?: string;
    }
}

export default async function BarbershopDetailsPage({params}: BarbershopDetailsPage) {
    const session = await getServerSession(authOptions);
    const barbershop = await db.barbershop.findUnique({
        where:{
            id: params.id
        },
        include:{
            services: true
        }
    })
    if(!barbershop){
        return(
            <h1>Nenhum registro!</h1>
        );
    }
  return (
    <div className="flex flex-col">
        <BarbershopInfo barbershop={barbershop}/>
        <div className="flex flex-col md:flex-row md:flex-wrap">
            {barbershop.services.map((service) => (
                <ServiceItem key={service.id} barbershop={barbershop} service={service} isAuthenticated={!!session?.user}/>
            ))}
        </div>
        
        
    </div>
    
  )
}
