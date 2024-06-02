'use server'

import { sql } from '@vercel/postgres';
import { EventCategory } from '@/app/model/event-category.model';
 
export async function getEventCategory(id: number) : Promise<EventCategory>{
    try {
        var eventCategoriesResult = await sql<EventCategory>`SELECT * FROM EventCategories WHERE id = ${id}`;
        if(eventCategoriesResult.rows.length > 0) {
            return eventCategoriesResult.rows[0]
        } else {
            throw new Error(`Cannot locate category with id ${id}`);
        }
    } catch (error) {
        throw error;
    }
}