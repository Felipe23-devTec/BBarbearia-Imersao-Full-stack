import { Service } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image";
import { Button } from "./ui/button";
interface ServiceItemProps{
    service: Service
}
export default function ServiceItem({service}: ServiceItemProps) {
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
                    <Button variant="secondary">Reservar</Button>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
