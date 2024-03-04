"use server";

import { db } from '@/lib/prisma';
import { Booking } from '@prisma/client';


import { revalidatePath } from "next/cache";


export const cancelBooking = async (bookingId: string) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  });

  revalidatePath("/");
  revalidatePath("/bookings");
};