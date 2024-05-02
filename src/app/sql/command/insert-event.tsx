'use server'

import { sql } from '@vercel/postgres';
 
export async function addEventCommand(eventName: string) {
    try {
        const result = await sql`INSERT INTO Events (Name) VALUES(${eventName})`;
        console.log(result);
        return {message: 'event created', status: 204};
    } catch (error) {
        return {message: error, status: 500};
    }
}