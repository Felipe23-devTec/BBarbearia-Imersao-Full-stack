
import BarbershopItem from "@/components/barbershop-item";
import BookingItem from "@/components/booking-item";
import Header from "@/components/header";
import Search from "@/components/search";
import { db } from "@/lib/prisma";
import {format} from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function Home() {
  const barbershops = await db.barbershop.findMany({})
  return (
    <div className="">
      <Header/>
      <div className="pt-6 px-5">
        <h2 className="text-xl font-bold">Olá, João</h2>
        <p className="capitalize text-sm">{format(new Date(), "EEEE',' d 'de' MMMM",{
            locale: ptBR
        })}</p>
      </div>
      <div className="px-5 mt-6">
        <Search texto="Busque por uma barbearia..."/>
        <div className="mt-6">
          <h2 className="text-xs uppercase mb-3 text-gray-400 font-bold">Agendamentos</h2>
          <BookingItem/>
        </div>
        <div className="mt-6 mb-[4.5rem]">
          <h2 className="text-xs uppercase mb-3 text-gray-400 font-bold">Recomendados</h2>
          <div className="flex md:flex-wrap gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
            {barbershops.map(barbershop => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>

          
          
        </div>
        
      </div>
      
      
    </div>
  )
}
