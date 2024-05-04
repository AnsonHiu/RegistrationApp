'use server'

import { sql } from '@vercel/postgres';
import Event from '@/app/model/event.model';
 
export async function getEventsByName(eventName: string) : Promise<Event[]>{
    try {
        var event = await sql<Event>`SELECT * FROM Events WHERE Name = ${eventName}`;
        return event.rows;
    } catch (error) {
        throw error;
    }
}