
import BarbershopItem from "@/components/barbershop-item";
import BookingItem from "@/components/booking-item";
import Header from "@/components/header";
import Search from "@/components/search";
import { db } from "@/lib/prisma";
import {compareAsc, format, isFuture, subMonths} from "date-fns";
import { ptBR } from "date-fns/locale";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import BookingHome from "@/components/bookingHome";
export default async function Home() {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const bookings = session?.user ?await db.booking.findMany({
    where:{
      userId: (session?.user as any).id,
    },
    include:{
      service: true,
      barbershop: true
    }
  }) : []
  const hoje = new Date();
    const tresMesesAtras = subMonths(hoje, 2);
    const confirmadosBookings = bookings.filter(booking =>
      isFuture(booking.date))   //pegar so do mes: && isThisMonth(booking.date)
      confirmadosBookings.sort((bookingA, bookingB) =>
        compareAsc(new Date(bookingA.date), new Date(bookingB.date))
    );
  return (
    <div className="">
      <Header/>
      <div className="pt-6 px-5">
        <h2 className="text-xl font-bold">{session?.user ? ("Olá, "+session.user.name) : ("Vamos realizar uma reserva!")}</h2>
        <p className="capitalize text-sm">{format(new Date(), "EEEE',' d 'de' MMMM",{
            locale: ptBR
        })}</p>
      </div>
      <div className="px-5 mt-6 scrol">
        <Search texto="Busque por uma barbearia..."/>
        <div className="mt-6">
          <h2 className="text-xs uppercase mb-3 text-gray-400 font-bold">Agendamentos</h2>
          
        </div>
        <div className="flex gap-3 overflow-auto">
        {confirmadosBookings.map(booking =>(
            <BookingHome key={booking.id} booking={booking}/>
          ))}
        </div>
        <div className="mt-6">
          <h2 className="text-xs uppercase mb-3 text-gray-400 font-bold">Recomendados</h2>
          <div className="flex md:flex-wrap gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
            {barbershops.map(barbershop => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
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
