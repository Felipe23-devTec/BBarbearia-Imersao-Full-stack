
import Header from "@/components/header";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import BookingItem from "@/components/booking-item";


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
  return (
    <>
      <Header/>
      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        <h2 className="mb-3">Confirmados</h2>
        <div className="flex flex-col gap-3 md:flex-row flex-wrap">
          {bookings.map(booking => (
                <BookingItem key={booking.id} booking={booking}/>
              ))}
        </div>
      </div>
      
      
    </>
  )
}
