'use server'
 
import { redirect } from 'next/navigation'
 
export async function navigateToEvent() {
  redirect('/event');
}

export async function navigateToCheckIn(eventCategoryId: number) {
  redirect(`/event/checkin/${eventCategoryId}`);
}