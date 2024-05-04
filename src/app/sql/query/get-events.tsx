'use server'

import { sql } from '@vercel/postgres';
import Event from '@/app/model/event.model';
import { unstable_noStore } from 'next/cache';
 
export async function getEvents() : Promise<Event[]>{
    try {
        unstable_noStore();
        var event = await sql<Event>`SELECT * FROM Events`;
        return event.rows;
    } catch (error) {
        throw error;
    }
}