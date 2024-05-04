'use server'

import Participant from '@/app/model/participant.model';
import { sql } from '@vercel/postgres';

import { unstable_noStore } from 'next/cache';
 
export async function getParticipants(eventCategoryId: number) : Promise<Participant[]>{
    try {
        unstable_noStore();
        var event = await sql<Participant>`SELECT * FROM Participants WHERE EventCategoryId = ${eventCategoryId}`;
        return event.rows;
    } catch (error) {
        throw error;
    }
}