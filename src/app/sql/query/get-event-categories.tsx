'use server'

import { sql } from '@vercel/postgres';
import EventCategory from '@/app/model/event-category.model';
 
export async function getEventCategories(eventId: number) : Promise<EventCategory[]>{
    try {
        var eventCategoriesResult = await sql<EventCategory>`SELECT * FROM EventCategories WHERE EventId = ${eventId}`;
        return eventCategoriesResult.rows;
    } catch (error) {
        throw error;
    }
}