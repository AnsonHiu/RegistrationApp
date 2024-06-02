'use server'

import { sql } from '@vercel/postgres';
import { Event } from '@/app/model/event.model';
 
export async function getEvent(eventId: number) : Promise<Event>{
    try {
        var event = await sql<Event>`SELECT * FROM Events WHERE Id = ${eventId}`;
        return event.rows[0];
    } catch (error) {
        throw error;
    }
}