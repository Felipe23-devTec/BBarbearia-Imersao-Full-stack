
import Header from "@/components/header";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import BookingItem from "@/components/booking-item";
import { compareAsc, compareDesc, endOfMonth, isFuture, isPast, isThisMonth, isWithinInterval, startOfMonth, subMonths } from "date-fns";


export default async function BookingsPage() {
    const session = await getServerSession(authOptions)

    if(!session?.user){
        return redirect("/");
    }
    const bookings = await db.booking.findMany({
      where:{
        userId: (session.user as any).id,
      },
      include:{
        service: true,
        barbershop: true
      }
    })
    const hoje = new Date();
    const tresMesesAtras = subMonths(hoje, 2);
    const confirmadosBookings = bookings.filter(booking =>
      isFuture(booking.date))   //pegar so do mes: && isThisMonth(booking.date)
      confirmadosBookings.sort((bookingA, bookingB) =>
        compareAsc(new Date(bookingA.date), new Date(bookingB.date))
    );
    const finalizadosBookings = bookings.filter(booking => isPast(booking.date) && isWithinInterval(booking.date, { start: startOfMonth(tresMesesAtras), end: endOfMonth(hoje) }))
    finalizadosBookings.sort((bookingA, bookingB) =>
        compareDesc(new Date(bookingA.date), new Date(bookingB.date))
    );
  return (
    <>
      <Header/>
      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        <h2 className="mb-3">Confirmados</h2>
        <div className="flex flex-col gap-4 md:flex-row flex-wrap">
          {confirmadosBookings.map(booking => (
                <BookingItem key={booking.id} booking={booking}/>
              ))}
        </div>
        <h2 className="my-3">Finalizados</h2>
        <div className="flex flex-col gap-4 md:flex-row flex-wrap">
          {finalizadosBookings.map(booking => (
                <BookingItem key={booking.id} booking={booking}/>
              ))}
        </div>
      </div>
      
      
    </>
  )
}
